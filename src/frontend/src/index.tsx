import * as React from "react";
import * as ReactDOM from "react-dom";

import "../assets/html/index.html";
import "../assets/js/babylon.objFileLoader.min.js";

import { GameWorld } from "./components/GameWorld";
import { Terminal } from "./components/Terminal";

ReactDOM.render(<GameWorld />, document.getElementById("game-world-container"));
ReactDOM.render(<Terminal />, document.getElementById("terminal-container"));
