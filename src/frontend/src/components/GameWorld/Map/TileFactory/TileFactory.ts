import * as BABYLON from 'babylonjs';
import * as HexTools from 'hex-tools';

import { HexagonalTile } from '../HexagonalTile';

export interface ITileFactoryParams {
  scene: BABYLON.Scene;
  tileSize: number;
}

export enum TileType {
  PLANE,
  SLOPE_UP,
  SLOPE_DOWN,
  SLOPE_CORNER
}

export enum TileDirection {
  NORTH,
  NORTH_EAST,
  EAST,
  SOUTH_EAST,
  SOUTH,
  SOUTH_WEST,
  WEST,
  NORTH_WEST
}

export class TileFactory {
  protected readonly tileSize: number;
  protected readonly scene: BABYLON.Scene;
  protected readonly meshes: {
    plane: BABYLON.Mesh,
    slopeCorner: BABYLON.Mesh,
    slopeUp: BABYLON.Mesh,
    slopeDown: BABYLON.Mesh,
    [key: string]: BABYLON.Mesh;
  };

  constructor(params: ITileFactoryParams) {
    this.scene = params.scene;
    this.tileSize = params.tileSize;

    const discParams = { radius: this.tileSize, tessellation: 6, updatable: true };
    this.meshes = {
      plane: BABYLON.MeshBuilder.CreateDisc('plane', discParams, this.scene),
      slopeCorner: BABYLON.MeshBuilder.CreateDisc('plane', discParams, this.scene),
      slopeDown: BABYLON.MeshBuilder.CreateDisc('plane', discParams, this.scene),
      slopeUp: BABYLON.MeshBuilder.CreateDisc('plane', discParams, this.scene)
    };

    this.meshes.slopeUp.updateMeshPositions((positions: number[]) => {
      positions[8] -= this.tileSize / 2;
      positions[11] -= this.tileSize / 2;
    }, true);

    this.meshes.slopeDown.updateMeshPositions((positions: number[]) => {
      positions[8] += this.tileSize / 2;
      positions[11] += this.tileSize / 2;
    }, true);

    this.meshes.slopeCorner.updateMeshPositions((positions: number[]) => {
      positions[8] -= this.tileSize / 2;
    }, true);

    for (const mesh in this.meshes) {
      if (this.meshes.hasOwnProperty(mesh)) {
        this.meshes[mesh].rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2, BABYLON.Space.WORLD);
        // this.meshes[mesh].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 6, BABYLON.Space.WORLD);
        // this.meshes[mesh].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2, BABYLON.Space.WORLD);
        this.meshes[mesh].setEnabled(false);
      }
    }
  }

  public getTile(type: TileType, direction: TileDirection) {
    // meshInstance: this.meshes.plane.createInstance('HexagonalTile')

    // hexagonalTile.meshInstance.edgesWidth = 4.0;
    // hexagonalTile.meshInstance.isPickable = true;
    // hexagonalTile.meshInstance.actionManager = new BABYLON.ActionManager(this.scene);
    //
    // hexagonalTile.meshInstance.actionManager.registerAction(
    //   new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
    //   hexagonalTile.meshInstance.enableEdgesRendering();
    // }));
    //
    // hexagonalTile.meshInstance.actionManager.registerAction(
    //   new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
    //   hexagonalTile.meshInstance.disableEdgesRendering();
    // }));

    return new HexagonalTile({
      height: 0,
      meshInstance: this.getMesh(type, direction),
      position: new HexTools.AxialVector({ q: 0, r: 0 }),
      size: this.tileSize
    });
  }

  protected getMesh(type: TileType, direction: TileDirection) {
    let mesh: BABYLON.Mesh;

    if (type === TileType.PLANE) {
      mesh = this.meshes.plane.clone('HexagonalTile');
    } else if (type === TileType.SLOPE_UP) {
      mesh = this.meshes.slopeUp.clone('HexagonalTile');
    } else if (type === TileType.SLOPE_DOWN) {
      mesh = this.meshes.slopeDown.clone('HexagonalTile');
    } else if (type === TileType.SLOPE_CORNER) {
      mesh = this.meshes.slopeCorner.clone('HexagonalTile');
    } else {
      throw new Error(`Unknown tile type: ${type}`);
    }

    if (type === TileType.SLOPE_CORNER) {
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
      } else if (direction === TileDirection.WEST || direction === TileDirection.EAST) {
        throw new Error('Wrong direction');
      }
    } else if (type === TileType.SLOPE_UP || type === TileType.SLOPE_DOWN) {
      if (direction === TileDirection.NORTH_EAST) {
        mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * -2, BABYLON.Space.WORLD);
      } else if (direction === TileDirection.EAST) {
        mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * -1, BABYLON.Space.WORLD);
      } else if (direction === TileDirection.SOUTH_EAST) {
        mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 0, BABYLON.Space.WORLD);
      } else if (direction === TileDirection.SOUTH_WEST) {
        mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 1, BABYLON.Space.WORLD);
      } else if (direction === TileDirection.WEST) {
        mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 2, BABYLON.Space.WORLD);
      } else if (direction === TileDirection.NORTH_WEST) {
        mesh.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3 * 3, BABYLON.Space.WORLD);
      } else if (direction === TileDirection.NORTH || direction === TileDirection.SOUTH) {
        throw new Error('Wrong direction');
      }
    }
    return mesh;
  }
}
