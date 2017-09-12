import * as BABYLON from "babylonjs";
import * as HexTools from "hex-tools";

import {
  Biome,
  ITileTexture,
  TileDirection,
} from "GameWorld/gameComponents";
import { RailTile, TileType } from "GameWorld/tiles";
import * as Tools from "GameWorld/Tools";

export interface IRailTileFactoryParams {
  scene: BABYLON.Scene;
  tileSize: number;
  textures: ITileTexture[];
  biome: Biome;
}

export enum RailTileShape {
  PLANE = "plane",
  SLOPE_DOWN = "slopeDown",
  SLOPE_UP = "slopeUp",
}

export class RailTileFactory {
  public readonly biome: Biome;

  protected readonly tileSize: number;
  protected readonly scene: BABYLON.Scene;
  protected materials: BABYLON.StandardMaterial[] = [];
  protected weights: number[] = [];
  protected TilePrototypes: {
    planes: BABYLON.Mesh[]
    slopeDowns: BABYLON.Mesh[]
    slopeUps: BABYLON.Mesh[]
    [key: string]: BABYLON.Mesh[],
  };

  constructor(params: IRailTileFactoryParams) {
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

  public getTile(shape: RailTileShape, direction: TileDirection) {
    const meshInstance = this.getMeshInstance(shape);
    this.setMeshRotation(meshInstance, shape, direction);

    return new RailTile({
      biome: this.biome,
      direction,
      height: 0,
      meshInstance,
      position: new HexTools.AxialVector({ q: 0, r: 0 }),
      shape,
      size: this.tileSize,
      type: TileType.Rail,
    });
  }

  protected setTilePrototypes() {
    const planes: BABYLON.Mesh[] = [];
    const slopeDowns: BABYLON.Mesh[] = [];
    const slopeUps: BABYLON.Mesh[] = [];
    const discParams = { radius: this.tileSize, tessellation: 6, updatable: true };

    this.materials.forEach((material) => {
      let mesh = BABYLON.MeshBuilder.CreateDisc(RailTileShape.PLANE, discParams, this.scene);
      this.prepareGeometry(RailTileShape.PLANE, mesh);
      mesh.material = material;
      mesh.setEnabled(false);
      planes.push(mesh);

      mesh = BABYLON.MeshBuilder.CreateDisc(RailTileShape.SLOPE_DOWN, discParams, this.scene);
      this.prepareGeometry(RailTileShape.SLOPE_DOWN, mesh);
      mesh.material = material;
      mesh.setEnabled(false);
      slopeDowns.push(mesh);

      mesh = BABYLON.MeshBuilder.CreateDisc(RailTileShape.SLOPE_UP, discParams, this.scene);
      this.prepareGeometry(RailTileShape.SLOPE_UP, mesh);
      mesh.material = material;
      mesh.setEnabled(false);
      slopeUps.push(mesh);
    });

    this.TilePrototypes = {
      planes,
      slopeDowns,
      slopeUps,
    };
  }

  protected prepareGeometry(shape: RailTileShape, mesh: BABYLON.Mesh) {
    const heightFactor = 2;

    switch (shape) {
      case RailTileShape.PLANE:
        break;
      case RailTileShape.SLOPE_UP:
        mesh.updateMeshPositions((positions: number[]) => {
          positions[8] -= this.tileSize / heightFactor;
          positions[11] -= this.tileSize / heightFactor;
        }, true);
        break;
      case RailTileShape.SLOPE_DOWN:
        mesh.updateMeshPositions((positions: number[]) => {
          positions[8] += this.tileSize / heightFactor;
          positions[11] += this.tileSize / heightFactor;
        }, true);
        break;
      default:
        throw new Error(`Unknown tile type: ${shape}`);
    }

    mesh.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2, BABYLON.Space.WORLD);
  }

  protected getMeshInstance(shape: RailTileShape) {
    let mesh: BABYLON.InstancedMesh;
    const index = Tools.General.getRandomArbitrary(0, this.materials.length);

    switch (shape) {
      case RailTileShape.PLANE:
        mesh = this.TilePrototypes.planes[index].createInstance(RailTileShape.PLANE);
        break;
      case RailTileShape.SLOPE_UP:
        mesh = this.TilePrototypes.slopeUps[index].createInstance(RailTileShape.SLOPE_UP);
        break;
      case RailTileShape.SLOPE_DOWN:
        mesh = this.TilePrototypes.slopeDowns[index].createInstance(RailTileShape.SLOPE_DOWN);
        break;
      default:
        throw new Error(`Unknown tile shape: ${shape}`);
    }

    return mesh;
  }

  protected setMeshRotation(mesh: BABYLON.InstancedMesh, shape: RailTileShape, direction: TileDirection) {
    switch (shape) {
      case RailTileShape.PLANE:
        break;
      case RailTileShape.SLOPE_UP:
      case RailTileShape.SLOPE_DOWN:
        this.setSlopeMeshRotation(mesh, direction);
        break;
      default:
        throw new Error(`Unknown tile type: ${shape}`);
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
}
