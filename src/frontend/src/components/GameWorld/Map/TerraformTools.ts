import * as HexTools from 'hex-tools';

import { BiomeMap } from './Map';
import { BiomeTile } from './Tile';
import { TileDirection, TileType } from './TileFactory';

export class TerraformTools {
  public static elevateTile(position: (HexTools.AxialVector | HexTools.CubeVector), map: BiomeMap) {
    const targetTile = map.getHexagon(position);
    const neighbors = map.getHexagonNeighbors(position) as BiomeTile[];
    let neighborDirection: TileDirection;
    let neighborType: TileType;

    map.setTileHeight(position, ++targetTile.height);

    neighbors.forEach((neighborTile) => {
      const vector = targetTile.cubePosition.subtract(neighborTile.cubePosition);

      if (vector.isEqual(new HexTools.CubeVector(1, 0, -1))) {
        neighborDirection = TileDirection.EAST;
        neighborType = TileType.SLOPE_UP;
      } else if (vector.isEqual(new HexTools.CubeVector(1, -1, 0))) {
        neighborDirection = TileDirection.NORTH_EAST;
        neighborType = TileType.SLOPE_UP;
      } else if (vector.isEqual(new HexTools.CubeVector(0, -1, 1))) {
        neighborDirection = TileDirection.NORTH_WEST;
        neighborType = TileType.SLOPE_UP;
      } else if (vector.isEqual(new HexTools.CubeVector(-1, 0, 1))) {
        neighborDirection = TileDirection.WEST;
        neighborType = TileType.SLOPE_UP;
      } else if (vector.isEqual(new HexTools.CubeVector(-1, 1, 0))) {
        neighborDirection = TileDirection.SOUTH_WEST;
        neighborType = TileType.SLOPE_UP;
      } else if (vector.isEqual(new HexTools.CubeVector(0, 1, -1))) {
        neighborDirection = TileDirection.SOUTH_EAST;
        neighborType = TileType.SLOPE_UP;
      }

      map.replaceTile({
        biome: neighborTile.biome,
        direction: neighborDirection,
        height: neighborTile.height,
        position: neighborTile.axialPosition,
        type: neighborType
      });
    });
  }

  public static lowerTile(position: (HexTools.AxialVector | HexTools.CubeVector), map: BiomeMap) {
    const tile = map.getHexagon(position);
    map.setTileHeight(position, --tile.height);
  }
}
