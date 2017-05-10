import * as BABYLON from 'babylonjs';

import {Hexagon} from './Hexagon';
import {HexagonalTile} from './HexagonalTile';
import {
  ITileFactoryParams,
  TileType
} from './Types';

export class TileFactory {
  protected scene: BABYLON.Scene;
  protected meshes: {
    plane: BABYLON.Mesh,
    [key: string]: BABYLON.Mesh;
  };

  constructor(params: ITileFactoryParams) {
    this.scene = params.scene;

    this.meshes = {
      plane: BABYLON.MeshBuilder.CreateDisc('plane', {radius : Hexagon.SIZE, tessellation: 6}, this.scene)
    };

    for (const mesh in this.meshes) {
      if (this.meshes.hasOwnProperty(mesh)) {
        this.meshes[mesh].rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2, BABYLON.Space.WORLD);
        this.meshes[mesh].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 6, BABYLON.Space.WORLD);
        // this.meshes[mesh].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2, BABYLON.Space.WORLD);
        this.meshes[mesh].setEnabled(false);
      }
    }
  }

  public getTitle(type: TileType) {
    if (type === TileType.PLANE) {
      const hexagonalTile = new HexagonalTile({
        meshInstance: this.meshes.plane.createInstance('HexagonalTile')
      });

      hexagonalTile.meshInstance.edgesWidth = 4.0;
      hexagonalTile.meshInstance.isPickable = true;
      hexagonalTile.meshInstance.actionManager = new BABYLON.ActionManager(this.scene);

      hexagonalTile.meshInstance.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
        hexagonalTile.meshInstance.enableEdgesRendering();
      }));

      hexagonalTile.meshInstance.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
        hexagonalTile.meshInstance.disableEdgesRendering();
      }));

      return hexagonalTile;
    } else if (type === TileType.SLOPE) {
      throw new Error(`Unknown tile type: ${type}`);
    } else {
      throw new Error(`Unknown tile type: ${type}`);
    }
  }
}
