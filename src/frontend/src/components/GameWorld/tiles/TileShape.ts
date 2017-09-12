import { GroundTileShape } from "GameWorld/tiles";
import { RailTileShape } from "GameWorld/tiles";

export type TileShape = (GroundTileShape | RailTileShape);
