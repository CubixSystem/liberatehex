import { BiomeTile, IBiomeTileParams } from "gameComponents/Tile";

// export interface IGroundTileParams extends IBiomeTileParams {}

export class GroundTile extends BiomeTile {
  constructor(params: IBiomeTileParams) {
    super(params);
  }
}
