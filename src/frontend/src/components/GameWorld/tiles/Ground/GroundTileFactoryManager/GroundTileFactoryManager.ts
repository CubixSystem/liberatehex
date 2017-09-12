import * as BABYLON from "babylonjs";

import { Biome, ITileFactoryManager, TileDirection } from "GameWorld/gameComponents";
import { GroundTexture, GroundTileFactory, GroundTileShape } from "../";

export interface ITileFactoryManagerParams {
  scene: BABYLON.Scene;
  tileSize: number;
}

export class GroundTileFactoryManager implements ITileFactoryManager {
  protected biomefactories: Map<Biome, GroundTileFactory> = new Map();
  protected scene: BABYLON.Scene;
  protected tileSize: number;

  constructor(params: ITileFactoryManagerParams) {
    this.scene = params.scene;
    this.tileSize = params.tileSize;
    this.biomefactories
      .set(Biome.TEST, new GroundTileFactory({
        biome: Biome.TEST,
        scene: this.scene,
        textures: GroundTexture,
        tileSize: this.tileSize,
      }));
  }

  public getTile(params: { shape: GroundTileShape, direction: TileDirection, biome: Biome }) {
    return this.getBiomeFactory(params.biome).getTile(params.shape, params.direction);
  }

  protected getBiomeFactory(biome: Biome) {
    const factory = this.biomefactories.get(biome);
    if (!factory) { throw new Error("Tile factory not found"); }
    return factory;
  }
}
