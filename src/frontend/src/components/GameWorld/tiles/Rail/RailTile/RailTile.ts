import { BiomeTile, IBiomeTileParams } from "gameComponents";

// export interface IRailTileParams extends IBiomeTileParams {}

export class RailTile extends BiomeTile {
  constructor(params: IBiomeTileParams) {
    super(params);
  }
}
