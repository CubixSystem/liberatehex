import { GroundTileShape } from "tiles/Ground";
import { RailTileShape } from "tiles/Rail";

export type TileShape = (GroundTileShape | RailTileShape);
