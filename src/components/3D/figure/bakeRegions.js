import * as THREE from "three";
import { classifyMuscleTriangle, dominantBoneName, MUSCLE_REGIONS, regionMaterialColor } from "./regions";

const shellOffsetCm = 0.8;
const bulgeCm = 1.6;

export function weldPositionNormals(geometry) {
  const position = geometry.getAttribute("position");
  const normal = geometry.getAttribute("normal");
  if (!position || !normal) return;
  const bins = new Map();
  for (let i = 0; i < position.count; i += 1) {
    const key = `${position.getX(i).toFixed(4)}:${position.getY(i).toFixed(4)}:${position.getZ(i).toFixed(4)}`;
    if (!bins.has(key)) bins.set(key, []);
    bins.get(key).push(i);
  }
  const sum = new THREE.Vector3();
  for (const vertices of bins.values()) {
    if (vertices.length < 2) continue;
    sum.set(0, 0, 0);
    for (const vertex of vertices) sum.add(new THREE.Vector3(normal.getX(vertex), normal.getY(vertex), normal.getZ(vertex)));
    sum.normalize();
    for (const vertex of vertices) normal.setXYZ(vertex, sum.x, sum.y, sum.z);
  }
  normal.needsUpdate = true;
}

function getTriangleIndex(geometry, offset) {
  const index = geometry.getIndex();
  return index ? index.getX(offset) : offset;
}

function dominantForTriangle(mesh, vertices) {
  return dominantBoneName(mesh, vertices);
}

function copyGeometryWithShell(bodyGeometry, triangleIndices, bodyMesh) {
  const shellGeometry = new THREE.BufferGeometry();
  const positions = bodyGeometry.getAttribute("position").clone();
  const normals = bodyGeometry.getAttribute("normal").clone();
  const localNormal = new THREE.Vector3();
  const position = new THREE.Vector3();
  for (let i = 0; i < positions.count; i += 1) {
    position.fromBufferAttribute(positions, i);
    localNormal.fromBufferAttribute(normals, i).normalize();
    positions.setXYZ(i, position.x + localNormal.x * shellOffsetCm, position.y + localNormal.y * shellOffsetCm, position.z + localNormal.z * shellOffsetCm);
  }
  shellGeometry.setAttribute("position", positions);
  shellGeometry.setAttribute("normal", normals);
  for (const name of ["skinIndex", "skinWeight"]) {
    const attribute = bodyGeometry.getAttribute(name);
    if (attribute) shellGeometry.setAttribute(name, attribute.clone());
  }
  shellGeometry.setIndex(triangleIndices);
  const inflated = positions.clone();
  for (let i = 0; i < inflated.count; i += 1) {
    position.fromBufferAttribute(inflated, i);
    localNormal.fromBufferAttribute(normals, i).normalize();
    inflated.setXYZ(i, position.x + localNormal.x * bulgeCm, position.y + localNormal.y * bulgeCm, position.z + localNormal.z * bulgeCm);
  }
  shellGeometry.morphAttributes.position = [inflated];
  shellGeometry.morphTargetsRelative = false;
  shellGeometry.computeBoundingSphere();
  return shellGeometry;
}

function createShellMaterial(region) {
  const color = regionMaterialColor(region);
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.08,
    roughness: 0.48,
    metalness: 0,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1
  });
}

/** Assign each bind-pose triangle to at most one anatomical overlay and build it as a skinned mesh. */
export function createMuscleShells(bodyMesh, bodyHeight = 1.75) {
  weldPositionNormals(bodyMesh.geometry);
  bodyMesh.updateWorldMatrix(true, false);
  const geometry = bodyMesh.geometry;
  const positionAttr = geometry.getAttribute("position");
  const normalAttr = geometry.getAttribute("normal");
  const indexAttr = geometry.getIndex();
  const triangleCount = indexAttr ? indexAttr.count / 3 : positionAttr.count / 3;
  const byRegion = new Map(MUSCLE_REGIONS.map((region) => [region.id, []]));
  const point = new THREE.Vector3();
  const centroid = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const faceNormal = new THREE.Vector3();
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3().getNormalMatrix(bodyMesh.matrixWorld);

  for (let triangle = 0; triangle < triangleCount; triangle += 1) {
    const vertices = [getTriangleIndex(geometry, triangle * 3), getTriangleIndex(geometry, triangle * 3 + 1), getTriangleIndex(geometry, triangle * 3 + 2)];
    centroid.set(0, 0, 0);
    faceNormal.set(0, 0, 0);
    for (const vertex of vertices) {
      point.fromBufferAttribute(positionAttr, vertex);
      bodyMesh.localToWorld(point);
      centroid.add(point);
      normal.fromBufferAttribute(normalAttr, vertex).applyMatrix3(normalMatrix).normalize();
      faceNormal.add(normal);
    }
    centroid.multiplyScalar(1 / 3);
    faceNormal.normalize();
    // Avoid tiny/folded triangles and keep the classification stable at the surface.
    a.fromBufferAttribute(positionAttr, vertices[0]);
    b.fromBufferAttribute(positionAttr, vertices[1]);
    c.fromBufferAttribute(positionAttr, vertices[2]);
    const cross = b.sub(a).cross(c.sub(a));
    if (cross.lengthSq() < 1e-10) continue;
    const boneName = dominantForTriangle(bodyMesh, vertices);
    const side = centroid.x < 0 ? -1 : 1;
    const classified = classifyMuscleTriangle({ boneName, yFraction: centroid.y / bodyHeight, absX: Math.abs(centroid.x), normal: faceNormal, side });
    if (classified) byRegion.get(classified.id)?.push(...vertices);
  }

  const shells = [];
  for (const region of MUSCLE_REGIONS) {
    const indices = byRegion.get(region.id);
    if (!indices?.length) continue;
    const shell = new THREE.SkinnedMesh(copyGeometryWithShell(geometry, indices, bodyMesh), createShellMaterial(region));
    shell.name = region.id;
    shell.userData.regionId = region.id;
    shell.userData.group = region.group;
    shell.userData.label = region.name;
    shell.userData.region = region;
    shell.bindMode = bodyMesh.bindMode;
    shell.bind(bodyMesh.skeleton, bodyMesh.bindMatrix.clone());
    shell.position.copy(bodyMesh.position);
    shell.quaternion.copy(bodyMesh.quaternion);
    shell.scale.copy(bodyMesh.scale);
    shell.frustumCulled = false;
    shell.castShadow = false;
    shell.receiveShadow = false;
    shell.updateMorphTargets();
    bodyMesh.parent.add(shell);
    shells.push(shell);
  }
  return shells;
}
