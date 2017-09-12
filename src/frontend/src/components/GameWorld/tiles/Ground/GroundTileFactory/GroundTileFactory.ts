import * as BABYLON from "babylonjs";
import * as HexTools from "hex-tools";

import {
  Biome,
  ITileTexture,
  TileDirection,
} from "GameWorld/gameComponents";
import { GroundTile, TileType } from "GameWorld/tiles";
import * as Tools from "GameWorld/Tools";

export interface IGroundTileFactoryParams {
  scene: BABYLON.Scene;
  tileSize: number;
  textures: ITileTexture[];
  biome: Biome;
}

export enum GroundTileShape {
  GROUND_DOUBLE_SLOPE_UP = "ground:doubleSlopeUp",
  GROUND_PLANE = "ground:plane",
  GROUND_SLOPE_CORNER = "ground:slopeCorner",
  GROUND_SLOPE_DOWN = "ground:slopeDown",
  GROUND_SLOPE_UP = "ground:slopeUp",
}

export class GroundTileFactory {
  public readonly biome: Biome;

  protected readonly tileSize: number;
  protected readonly scene: BABYLON.Scene;
  protected materials: BABYLON.StandardMaterial[] = [];
  protected weights: number[] = [];
  protected TilePrototypes: {
    planes: BABYLON.Mesh[]
    slopeCorners: BABYLON.Mesh[]
    slopeDoubleUps: BABYLON.Mesh[]
    slopeDowns: BABYLON.Mesh[]
    slopeUps: BABYLON.Mesh[]
    [key: string]: BABYLON.Mesh[],
  };

  constructor(params: IGroundTileFactoryParams) {
    this.scene = params.scene;
    this.tileSize = params.tileSize;
    this.biome = params.biome;
    params.textures.forEach((texture, index) => {
      const material = new BABYLON.StandardMaterial(`material:${index}`, this.scene);
      material.specularColor = new BABYLON.Color3(0, 0, 0);
      material.diffuseTexture = new BABYLON.Texture(texture.path, this.scene);
      this.materials.push(material);
      this.weights.push(texture.weight);
    });

    this.setTilePrototypes();
  }

  public getTile(shape: GroundTileShape, direction: TileDirection) {
    const meshInstance = this.getMeshInstance(shape);
    this.setMeshRotation(meshInstance, shape, direction);

    return new GroundTile({
      biome: this.biome,
      direction,
      height: 0,
      meshInstance,
      position: new HexTools.AxialVector({ q: 0, r: 0 }),
      shape,
      size: this.tileSize,
      type: TileType.GROUND,
    });
  }

  protected setTilePrototypes() {
    const planes: BABYLON.Mesh[] = [];
    const slopeCorners: BABYLON.Mesh[] = [];
    const slopeDoubleUps: BABYLON.Mesh[] = [];
    const slopeDowns: BABYLON.Mesh[] = [];
    const slopeUps: BABYLON.Mesh[] = [];
    const discParams = { radius: this.tileSize, tessellation: 6, updatable: true };

    this.materials.forEach((material) => {
      let mesh = BABYLON.MeshBuilder.CreateDisc("plane", discParams, this.scene);
      this.prepareGeometry(GroundTileShape.GROUND_PLANE, mesh);
      mesh.material = material;
      mesh.setEnabled(false);
      planes.push(mesh);

      mesh = BABYLON.MeshBuilder.CreateDisc("slopeCorner", discParams, this.scene);
      this.prepareGeometry(GroundTileShape.GROUND_SLOPE_CORNER, mesh);
      mesh.material = material;
      mesh.setEnabled(false);
      slopeCorners.push(mesh);

      mesh = BABYLON.MeshBuilder.CreateDisc("slopeDoubleUp", discParams, this.scene);
      this.prepareGeometry(GroundTileShape.GROUND_DOUBLE_SLOPE_UP, mesh);
      mesh.material = material;
      mesh.setEnabled(false);
      slopeDoubleUps.push(mesh);

      mesh = BABYLON.MeshBuilder.CreateDisc("slopeDown", discParams, this.scene);
      this.prepareGeometry(GroundTileShape.GROUND_SLOPE_DOWN, mesh);
      mesh.material = material;
      mesh.setEnabled(false);
      slopeDowns.push(mesh);

      mesh = BABYLON.MeshBuilder.CreateDisc("slopeUp", discParams, this.scene);
      this.prepareGeometry(GroundTileShape.GROUND_SLOPE_UP, mesh);
      mesh.material = material;
      mesh.setEnabled(false);
      slopeUps.push(mesh);
    });

    this.TilePrototypes = {
      planes,
      slopeCorners,
      slopeDoubleUps,
      slopeDowns,
      slopeUps,
    };
  }

  protected prepareGeometry(shape: GroundTileShape, mesh: BABYLON.Mesh) {
    const heightFactor = 2;

    switch (shape) {
      case GroundTileShape.GROUND_PLANE:
        break;
      case GroundTileShape.GROUND_SLOPE_CORNER:
        mesh.updateMeshPositions((positions: number[]) => {
          positions[8] -= this.tileSize / heightFactor;
        }, true);
        break;
      case GroundTileShape.GROUND_SLOPE_UP:
        mesh.updateMeshPositions((positions: number[]) => {
          positions[8] -= this.tileSize / heightFactor;
          positions[11] -= this.tileSize / heightFactor;
        }, true);
        break;
      case GroundTileShape.GROUND_SLOPE_DOWN:
        mesh.updateMeshPositions((positions: number[]) => {
          positions[8] += this.tileSize / heightFactor;
          positions[11] += this.tileSize / heightFactor;
        }, true);
        break;
      case GroundTileShape.GROUND_DOUBLE_SLOPE_UP:
        mesh.updateMeshPositions((positions: number[]) => {
          positions[8] -= this.tileSize / heightFactor;
          positions[11] -= this.tileSize / heightFactor;
          positions[14] -= this.tileSize / heightFactor;
        }, true);
        break;
      default:
        throw new Error(`Unknown tile type: ${shape}`);
    }

    mesh.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2, BABYLON.Space.WORLD);
  }

  protected getMeshInstance(type: GroundTileShape) {
    let mesh: BABYLON.InstancedMesh;
    const index = Tools.General.getRandomArbitrary(0, this.materials.length);

    switch (type) {
      case GroundTileShape.GROUND_PLANE:
        mesh = this.TilePrototypes.planes[index].createInstance(`plane`);
        break;
      case GroundTileShape.GROUND_SLOPE_CORNER:
        mesh = this.TilePrototypes.slopeCorners[index].createInstance("slopeCorner");
        break;
      case GroundTileShape.GROUND_SLOPE_UP:
        mesh = this.TilePrototypes.slopeUps[index].createInstance("slopeUp");
        break;
      case GroundTileShape.GROUND_SLOPE_DOWN:
        mesh = this.TilePrototypes.slopeDowns[index].createInstance("slopeDown");
        break;
      case GroundTileShape.GROUND_DOUBLE_SLOPE_UP:
        mesh = this.TilePrototypes.slopeDoubleUps[index].createInstance("slopeDoubleUp");
        break;
      default:
        throw new Error(`Unknown tile type: ${type}`);
    }

    return mesh;
  }

  protected setMeshRotation(mesh: BABYLON.InstancedMesh, type: GroundTileShape, direction: TileDirection) {
    switch (type) {
      case GroundTileShape.GROUND_PLANE:
        break;
      case GroundTileShape.GROUND_SLOPE_CORNER:
        this.setSlopeCornerMeshRotation(mesh, direction);
        break;
      case GroundTileShape.GROUND_SLOPE_UP:
      case GroundTileShape.GROUND_SLOPE_DOWN:
        this.setSlopeMeshRotation(mesh, direction);
        break;
      case GroundTileShape.GROUND_DOUBLE_SLOPE_UP:
        this.setDoubleSlopeCornerMeshRotation(mesh, direction);
        break;
      default:
        throw new Error(`Unknown tile type: ${type}`);
    }
    return mesh;
  }

  protected setSlopeMeshRotation(mesh: BABYLON.InstancedMesh, direction: TileDirection) {
    if (direction === TileDirection.NORTH_WEST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 4, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.NORTH_EAST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 5, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.EAST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 6, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.SOUTH_EAST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 7, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.SOUTH_WEST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 8, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.WEST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 9, BABYLON.Space.WORLD);
    } else {
      throw new Error("Wrong direction");
    }
    return mesh;
  }

  protected setSlopeCornerMeshRotation(mesh: BABYLON.InstancedMesh, direction: TileDirection) {
    if (direction === TileDirection.NORTH) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * -3, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.NORTH_EAST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * -2, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.SOUTH_EAST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * -1, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.SOUTH) {
      // mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 2, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.SOUTH_WEST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 1, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.NORTH_WEST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 2, BABYLON.Space.WORLD);
    } else {
      throw new Error("Wrong direction");
    }
    return mesh;
  }

  protected setDoubleSlopeCornerMeshRotation(mesh: BABYLON.InstancedMesh, direction: TileDirection) {
    if (direction === TileDirection.NORTH) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * -1, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.NORTH_EAST) {
      // mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * -2, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.SOUTH_EAST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 1, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.SOUTH) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 2, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.SOUTH_WEST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 3, BABYLON.Space.WORLD);
    } else if (direction === TileDirection.NORTH_WEST) {
      mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 4, BABYLON.Space.WORLD);
    } else {
      throw new Error("Wrong direction");
    }
    return mesh;
  }
}
