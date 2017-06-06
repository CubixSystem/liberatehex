import * as BABYLON from 'babylonjs';
import * as HexTools from 'hex-tools';

import { HexagonalTile } from '../Tile';
import {
  TileDirection,
  TileFactoryManager,
  TileType
} from '../TileFactory';
import { Biome } from './Biome';

export interface IHexagonMapParams extends HexTools.IHexagonGridParams { scene: BABYLON.Scene; }

export class HexagonMap extends HexTools.PointyTopHexagonGrid {
  private tileFactoryManager: TileFactoryManager;

  constructor(params: IHexagonMapParams) {
    super(params);
    this.tileFactoryManager = new TileFactoryManager({ scene: params.scene, tileSize: params.hexagonSize });
    this.generateGrid(() => this.tileFactoryManager.getTile({
      biome: Biome.TEST,
      direction: TileDirection.NORTH_EAST,
      type: TileType.PLANE
    }));
  }

  public setTileHeight(position: (HexTools.AxialVector | HexTools.CubeVector), height: number) {
    const tile = this.getHexagon(position);
    tile.height = height;
    this.updateMeshPosition(position);
  }

  public getTile(position: (HexTools.AxialVector | HexTools.CubeVector)) {
    return this.getHexagon(position);
  }

  public removeTile(position: (HexTools.AxialVector | HexTools.CubeVector)) {
    this.removeHexagon(position);
  }

  public replaceTile(params: {
    type: TileType,
    position: (HexTools.AxialVector | HexTools.CubeVector),
    direction: TileDirection,
    biome: Biome,
    height: number
  }) {
    const tile = this.tileFactoryManager.getTile(params);
    super.replaceHexagon(tile, params.position);
    this.setTileHeight(tile.axialPosition, params.height);
  }

  public getHexagon(position: (HexTools.AxialVector | HexTools.CubeVector)) {
    return super.getHexagon(position) as HexagonalTile;
  }

  public insertHexagon(tile: HexagonalTile, position: (HexTools.AxialVector | HexTools.CubeVector)) {
    super.insertHexagon(tile, position);
    this.updateMeshPosition(position);
  }

  public removeHexagon(position: (HexTools.AxialVector | HexTools.CubeVector)) {
    const tile = this.getHexagon(position);
    tile.meshInstance.dispose();
    super.removeHexagon(position);
  }

  protected updateMeshPosition(position: (HexTools.AxialVector | HexTools.CubeVector)) {
    const tile = this.getHexagon(position);
    tile.meshInstance.position = this.AxialToVector3(tile.axialPosition);
    tile.meshInstance.position.y = tile.height * this.hexagonSize / 2;
  }

  protected AxialToVector3(axialVector: HexTools.AxialVector) {
    const point = this.axialToPoint(axialVector);
    return new BABYLON.Vector3(point.y, 0, point.x);
  }
}