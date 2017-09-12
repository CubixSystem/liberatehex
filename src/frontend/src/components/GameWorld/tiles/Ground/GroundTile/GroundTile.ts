import { BiomeTile, IBiomeTileParams } from "GameWorld/gameComponents";

// export interface IGroundTileParams extends IBiomeTileParams {}

export class GroundTile extends BiomeTile {
  constructor(params: IBiomeTileParams) {
    super(params);
  }
}
