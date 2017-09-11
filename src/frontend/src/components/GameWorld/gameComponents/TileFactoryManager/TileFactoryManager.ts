import { BiomeTile } from "gameComponents";

export interface ITileFactoryManager {
  getTile(params: any): BiomeTile;
}
