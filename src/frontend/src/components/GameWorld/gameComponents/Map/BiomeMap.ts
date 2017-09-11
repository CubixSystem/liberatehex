import * as BABYLON from "babylonjs";
import * as HexTools from "hex-tools";

import {
  BiomeTile,
  ITileFactoryManager,
  TileDirection,
} from "@gameComponents";
import {
  GroundTileFactoryManager,
  TileShape,
  TileType,
 } from "@tiles";
import { Biome } from "./Biome";

export interface IHexagonMapParams extends HexTools.IHexagonGridParams { scene: BABYLON.Scene; }

export class BiomeMap extends HexTools.PointyTopHexagonGrid<BiomeTile> {
  protected TileFactoryManagers: Map<TileType, ITileFactoryManager> = new Map();

  constructor(params: IHexagonMapParams) {
    super(params);

    this.TileFactoryManagers.set(
      TileType.GROUND, new GroundTileFactoryManager({ scene: params.scene, tileSize: params.hexagonSize }));

    this.generateGrid(() => this.TileFactoryManagers.get(TileType.GROUND)!.getTile({
        biome: Biome.TEST,
        direction: TileDirection.NORTH_EAST,
        shape: TileShape.PLANE,
      }));
  }

  public setTileHeight(position: (HexTools.AxialVector | HexTools.CubeVector), height: number) {
    const tile = this.getHexagon(position);
    if (tile) {
      tile.height = height;
      this.updateMeshPosition(position);
    }
  }

  public getTile(position: (HexTools.AxialVector | HexTools.CubeVector)) {
    return this.getHexagon(position);
  }

  public removeTile(position: (HexTools.AxialVector | HexTools.CubeVector)) {
    this.removeHexagon(position);
  }

  public replaceTile(params: {
    type: TileShape,
    position: (HexTools.AxialVector | HexTools.CubeVector),
    direction: TileDirection,
    biome: Biome,
    height: number,
  }) {
    const tile = this.TileFactoryManagers.get(TileType.GROUND)!.getTile(params);
    super.replaceHexagon(tile, params.position);
    this.setTileHeight(tile.axialPosition, params.height);
  }

  public insertHexagon(tile: BiomeTile, position: (HexTools.AxialVector | HexTools.CubeVector)) {
    super.insertHexagon(tile, position);
    this.updateMeshPosition(position);
  }

  public removeHexagon(position: (HexTools.AxialVector | HexTools.CubeVector)) {
    const tile = this.getHexagon(position);
    if (tile) {
      tile.meshInstance.dispose();
      super.removeHexagon(position);
    }
  }

  protected updateMeshPosition(position: (HexTools.AxialVector | HexTools.CubeVector)) {
    const tile = this.getHexagon(position);
    if (tile) {
      tile.meshInstance.position = this.AxialToVector3(tile.axialPosition);
      tile.meshInstance.position.y = tile.height * this.hexagonSize / 2;
    }
  }

  protected AxialToVector3(axialVector: HexTools.AxialVector) {
    const point = this.axialToPoint(axialVector);
    return new BABYLON.Vector3(point.y, 0, point.x);
  }
}
