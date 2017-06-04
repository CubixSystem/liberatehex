import * as HexTools from 'hex-tools';

import { HexagonMap } from './HexagonMap';

export class TerraformTools {
  public static elevateTile(position: (HexTools.AxialVector | HexTools.CubeVector), map: HexagonMap) {
    let tile = map.getHexagon(position);
    map.setHexagonHeight(position, ++tile.height);
    const neighborPositions = map.getHexagonNeighborPositions(position);
    neighborPositions.forEach((neighborPosition) => {
      tile = map.getHexagon(neighborPosition);
      if (tile !== undefined) {
        // map.replaceHexagon(neighborPosition);
      }
    });
  }

  public static lowerTile(position: (HexTools.AxialVector | HexTools.CubeVector), map: HexagonMap) {
    const tile = map.getHexagon(position);
    map.setHexagonHeight(position, --tile.height);
  }
}
