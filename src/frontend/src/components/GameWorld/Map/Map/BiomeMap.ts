import * as HexTools from 'hex-tools';

import { BiomeTile } from '../Tile';
import { HexagonMap } from './HexagonMap';

export class BiomeMap extends HexagonMap {
  public getHexagon(position: (HexTools.AxialVector | HexTools.CubeVector)) {
    return super.getHexagon(position) as BiomeTile;
  }
}
