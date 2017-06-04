import * as BABYLON from 'babylonjs';

import * as Tools from './../../Tools';
import {
  ITileFactoryParams,
  TileDirection,
  TileFactory,
  TileType
} from './TileFactory';

export interface ITileTexture {
  path: string;
  weight: number;
}

export interface IBiomeTileFactoryParams extends ITileFactoryParams {
  textures: ITileTexture[];
}

export class BiomeTileFactory extends TileFactory {
  protected materials: BABYLON.StandardMaterial[] = [];
  protected weights: number[] = [];

  constructor(params: IBiomeTileFactoryParams) {
    super(params);

    params.textures.forEach((texture, index) => {
      this.materials.push(new BABYLON.StandardMaterial('texture', this.scene));
      this.materials[index].specularColor = new BABYLON.Color3(0, 0, 0);
      this.materials[index].diffuseTexture = new BABYLON.Texture(texture.path, this.scene);
      this.weights.push(texture.weight);
    });
  }

  protected getMesh(type: TileType, direction: TileDirection) {
    const mesh = super.getMesh(type, direction);
    mesh.material = this.materials[Tools.General.getRandomArbitrary(0, this.materials.length)];
    return mesh;
  }
}
