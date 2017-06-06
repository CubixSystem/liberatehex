import * as BABYLON from 'babylonjs';
import * as HexTools from 'hex-tools';

import * as Tools from '../../Tools';
import { Biome } from '../Map';
import { BiomeTile } from '../Tile';
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
  biome: Biome;
}

export class BiomeTileFactory extends TileFactory {
  public readonly biome: Biome;
  protected materials: BABYLON.StandardMaterial[] = [];
  protected weights: number[] = [];

  constructor(params: IBiomeTileFactoryParams) {
    super(params);

    this.biome = params.biome;
    params.textures.forEach((texture, index) => {
      this.materials.push(new BABYLON.StandardMaterial('texture', this.scene));
      this.materials[index].specularColor = new BABYLON.Color3(0, 0, 0);
      this.materials[index].diffuseTexture = new BABYLON.Texture(texture.path, this.scene);
      this.weights.push(texture.weight);
    });
  }

  public getTile(type: TileType, direction: TileDirection) {
    return new BiomeTile({
      biome: this.biome,
      direction,
      height: 0,
      meshInstance: this.getMesh(type, direction),
      position: new HexTools.AxialVector({ q: 0, r: 0 }),
      size: this.tileSize,
      type
    });
  }

  protected getMesh(type: TileType, direction: TileDirection) {
    const mesh = super.getMesh(type, direction);
    mesh.material = this.materials[Tools.General.getRandomArbitrary(0, 1)];
    return mesh;
  }
}
