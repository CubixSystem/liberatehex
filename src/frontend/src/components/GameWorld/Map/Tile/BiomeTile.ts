import { Biome } from '../Map';
import { HexagonalTile, IHexagonalTileParams } from './HexagonalTile';

export interface IBiomeTileParams extends IHexagonalTileParams {
  biome: Biome;
}

export class BiomeTile extends HexagonalTile {
  public readonly biome: Biome;

  constructor(params: IBiomeTileParams) {
    super(params);
    this.biome = params.biome;
  }
}
