import * as BABYLON from 'babylonjs';

import { Biome } from './../Biome';
import { BiomeTileFactory } from './BiomeTileFactory';
import * as Texture from './Texture';
import { TileDirection, TileType } from './TileFactory';

export interface ITileFactoryManagerParams {
  scene: BABYLON.Scene;
  tileSize: number;
}

export class TileFactoryManager {
  protected factories: Map<number, BiomeTileFactory> = new Map();
  protected scene: BABYLON.Scene;
  protected tileSize: number;

  constructor(params: ITileFactoryManagerParams) {
    this.scene = params.scene;
    this.tileSize = params.tileSize;
    this.factories.set(Biome.TEST, new BiomeTileFactory({
      scene: this.scene,
      textures: Texture.Ground,
      tileSize: this.tileSize
    }));
  }

  public getTile(params: { type: TileType, direction: TileDirection, biome: Biome }) {
    return this.getFactory(params.biome).getTile(params.type, params.direction);
  }

  protected getFactory(biome: Biome) {
    const factory = this.factories.get(biome);
    if (!factory) { throw new Error('Tile factory not found'); }
    return factory;
  }
}
