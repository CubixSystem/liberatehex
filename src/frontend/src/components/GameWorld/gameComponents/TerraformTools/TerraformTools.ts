import * as HexTools from "hex-tools";

import { BiomeMap, BiomeTile, TileDirection } from "@gameComponents";
import { GroundTileShape } from "@tiles";

export class TerraformTools {
  public static elevateTile(position: (HexTools.AxialVector | HexTools.CubeVector), map: BiomeMap) {
    const targetTile = map.getHexagon(position);
    if (!targetTile) { return; }

    const neighbors = map.getHexagonNeighbors(position) as BiomeTile[];
    let neighborDirection: TileDirection;

    map.replaceTile({
      biome: targetTile.biome,
      direction: TileDirection.NORTH,
      height: ++targetTile.height,
      position: targetTile.axialPosition,
      type: GroundTileShape.GROUND_PLANE,
    });

    neighbors.forEach((neighborTile) => {
      const vector = targetTile.cubePosition.subtract(neighborTile.cubePosition);
      const replaceNeighborTile = (direction: TileDirection, type: GroundTileShape) => {
        map.replaceTile({
          biome: neighborTile.biome,
          direction,
          height: neighborTile.height,
          position: neighborTile.axialPosition,
          type,
        });
      };

      if (neighborTile.height === targetTile.height - 1) {
        if (neighborTile.shape === GroundTileShape.GROUND_PLANE) {
          HexTools.PointyTopDirectionVector.forEach((directionVector, direction) => {
            if (vector.isEqual(directionVector)) {
              switch (direction) {
                case HexTools.PointyTopNeighborDirection.WEST:
                  neighborDirection = TileDirection.EAST;
                  break;
                case HexTools.PointyTopNeighborDirection.SOUTH_WEST:
                  neighborDirection = TileDirection.NORTH_EAST;
                  break;
                case HexTools.PointyTopNeighborDirection.SOUTH_EAST:
                  neighborDirection = TileDirection.NORTH_WEST;
                  break;
                case HexTools.PointyTopNeighborDirection.EAST:
                  neighborDirection = TileDirection.WEST;
                  break;
                case HexTools.PointyTopNeighborDirection.NORTH_EAST:
                  neighborDirection = TileDirection.SOUTH_WEST;
                  break;
                case HexTools.PointyTopNeighborDirection.NORTH_WEST:
                  neighborDirection = TileDirection.SOUTH_EAST;
                  break;
              }
            }
          });

          map.replaceTile({
            biome: neighborTile.biome,
            direction: neighborDirection,
            height: neighborTile.height,
            position: neighborTile.axialPosition,
            type: GroundTileShape.GROUND_SLOPE_UP,
          });
        } else if (neighborTile.shape === GroundTileShape.GROUND_SLOPE_UP) {
          HexTools.PointyTopDirectionVector.forEach((directionVector, direction) => {
            if (vector.isEqual(directionVector)) {
              switch (direction) {
                case HexTools.PointyTopNeighborDirection.WEST:
                  switch (neighborTile.direction) {
                  //   case TileDirection.EAST:
                  //     neighborDirection = TileDirection.EAST;
                  //     break;
                  //   case TileDirection.WEST:
                  //     // neighborDirection = TileDirection.EAST;
                  //     break;
                    case TileDirection.NORTH_EAST:
                      replaceNeighborTile(TileDirection.NORTH_EAST, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                  //   case TileDirection.NORTH_WEST:
                  //     neighborDirection = TileDirection.NORTH;
                  //     break;
                    case TileDirection.SOUTH_EAST:
                      replaceNeighborTile(TileDirection.SOUTH_EAST, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                  //   case TileDirection.SOUTH_WEST:
                  //     neighborDirection = TileDirection.SOUTH;
                  //     break;
                  }
                  break;
                case HexTools.PointyTopNeighborDirection.SOUTH_WEST:
                  switch (neighborTile.direction) {
                    case TileDirection.EAST:
                      replaceNeighborTile(TileDirection.NORTH_EAST, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                    // case TileDirection.WEST: break;
                    // case TileDirection.NORTH_EAST: break;
                    case TileDirection.NORTH_WEST:
                      replaceNeighborTile(TileDirection.NORTH, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                    // case TileDirection.SOUTH_EAST: break;
                    // case TileDirection.SOUTH_WEST: break;
                  }
                  break;
                case HexTools.PointyTopNeighborDirection.SOUTH_EAST:
                  switch (neighborTile.direction) {
                    // case TileDirection.EAST: break;
                    case TileDirection.WEST:
                      replaceNeighborTile(TileDirection.NORTH_WEST, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                    case TileDirection.NORTH_EAST:
                      replaceNeighborTile(TileDirection.NORTH, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                    // case TileDirection.NORTH_WEST: break;
                    // case TileDirection.SOUTH_EAST: break;
                    // case TileDirection.SOUTH_WEST: break;
                  }
                  break;
                case HexTools.PointyTopNeighborDirection.EAST:
                  switch (neighborTile.direction) {
                  //   case TileDirection.EAST:
                  //     // neighborDirection = TileDirection.EAST;
                  //     break;
                  //   case TileDirection.WEST:
                  //     // neighborDirection = TileDirection.EAST;
                  //     break;
                    // case TileDirection.NORTH_EAST:
                    //   break;
                    case TileDirection.NORTH_WEST:
                      replaceNeighborTile(TileDirection.NORTH_WEST, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                  //   case TileDirection.SOUTH_EAST:
                  //     // neighborDirection = TileDirection.EAST;
                  //     break;
                    case TileDirection.SOUTH_WEST:
                      replaceNeighborTile(TileDirection.SOUTH_WEST, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                  }
                  break;
                case HexTools.PointyTopNeighborDirection.NORTH_EAST:
                  switch (neighborTile.direction) {
                    // case TileDirection.EAST:
                    //   replaceNeighborTile(TileDirection.SOUTH_EAST, TileType.DOUBLE_SLOPE_UP);
                    //   break;
                    case TileDirection.WEST:
                      replaceNeighborTile(TileDirection.SOUTH_WEST, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                  //   case TileDirection.NORTH_EAST:
                  //     // neighborDirection = TileDirection.EAST;
                  //     break;
                    // case TileDirection.NORTH_WEST:
                    //   break;
                    case TileDirection.SOUTH_EAST:
                      replaceNeighborTile(TileDirection.SOUTH, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                  //   case TileDirection.SOUTH_WEST:
                  //     // neighborDirection = TileDirection.EAST;
                  //     break;
                  }
                  break;
                case HexTools.PointyTopNeighborDirection.NORTH_WEST:
                  switch (neighborTile.direction) {
                    case TileDirection.EAST:
                      replaceNeighborTile(TileDirection.SOUTH_EAST, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                    // case TileDirection.WEST:
                    //   replaceNeighborTile(TileDirection.SOUTH_WEST, TileType.DOUBLE_SLOPE_UP);
                    //   break;
                  //   case TileDirection.NORTH_EAST:
                  //     // neighborDirection = TileDirection.EAST;
                  //     break;
                  //   case TileDirection.NORTH_WEST:
                  //     // neighborDirection = TileDirection.EAST;
                  //     break;
                    // case TileDirection.SOUTH_EAST:
                      // neighborDirection = TileDirection.EAST;
                      // break;
                    case TileDirection.SOUTH_WEST:
                      replaceNeighborTile(TileDirection.SOUTH, GroundTileShape.GROUND_DOUBLE_SLOPE_UP);
                      break;
                  }
                  break;
              }
            }
          });
        }
      }
    });
  }

  public static lowerTile(position: (HexTools.AxialVector | HexTools.CubeVector), map: BiomeMap) {
    const targetTile = map.getHexagon(position);
    if (!targetTile) { return; }
    map.setTileHeight(position, --targetTile.height);
  }
}
