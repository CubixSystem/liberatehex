import * as BABYLON from 'babylonjs';

export class Hexagon {
  public static cubeToAxial(cube: BABYLON.Vector3) {
    return new BABYLON.Vector2(cube.x, cube.z);
  }

  public static axialToCube(hex: BABYLON.Vector2) {
    const x = hex.x;
    const z = hex.y;
    const y = -x - z;

    return new BABYLON.Vector3(x, y, z);
  }

  public static cubeDistance(a: BABYLON.Vector3, b: BABYLON.Vector3) {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y),
      Math.abs(a.z - b.z));
  }

  public static hexDistance(a: BABYLON.Vector2, b: BABYLON.Vector2) {
    const ac = Hexagon.axialToCube(a);
    const bc = Hexagon.axialToCube(b);

    return Hexagon.cubeDistance(ac, bc);
  }

  public static cubeRound(cube: BABYLON.Vector3) {
    let rx = Math.round(cube.x);
    let ry = Math.round(cube.y);
    let rz = Math.round(cube.z);

    const xDiff = Math.abs(rx - cube.x);
    const yDiff = Math.abs(ry - cube.y);
    const zDiff = Math.abs(rz - cube.z);

    if (xDiff > yDiff && xDiff > zDiff) {
      rx = -ry - rz;
    } else if (yDiff > zDiff) {
      ry = -rx - rz;
    } else {
      rz = -rx - ry;
    }

    return new BABYLON.Vector3(rx, ry, rz);
  }

  public static hexRound(hex: BABYLON.Vector2) {
    return Hexagon.cubeToAxial(
      Hexagon.cubeRound(
        Hexagon.axialToCube(hex)));
  }
}
