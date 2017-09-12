import { BiomeTile } from "GameWorld/gameComponents";

export interface ITileFactoryManager {
  getTile(params: { shape: string, direction: number, biome: number }): BiomeTile;
}
