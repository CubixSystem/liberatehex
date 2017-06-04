import * as BABYLON from 'babylonjs';
import * as HexTools from 'hex-tools';

import AssetsManager from './AssetsManager';
import Camera from './Camera';
import {
  HexagonMap,
  TerraformTools
} from './Map';

export class Game {
  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private camera: Camera;
  private light: BABYLON.Light;
  private assetsManager: AssetsManager;
  private map: HexagonMap;
  // private cellShadingMaterial: BABYLON.ShaderMaterial;

  constructor(canvas: HTMLCanvasElement) {
    // Create canvas and engine
    this.canvas = canvas;
    this.engine = new BABYLON.Engine(this.canvas, true);
  }

  public createScene() {
    this.scene = new BABYLON.Scene(this.engine);
    this.assetsManager = new AssetsManager(this.scene);

    this.initCamera();
    this.initLight();
    // this.initMaterial();

    // this.assetsManager.init().then((meshes: BABYLON.AbstractMesh[]) => {
    this.assetsManager.init().then(() => {
      /* world axis visualization */
      const size = 48;
      const worldOrigin = BABYLON.Vector3.Zero();

      const xAxis = BABYLON.Mesh.CreateLines(
        'x', [worldOrigin, (BABYLON.Axis.X).scale(size)], this.scene);
      const yAxis = BABYLON.Mesh.CreateLines(
        'y', [worldOrigin, (BABYLON.Axis.Y).scale(size)], this.scene);
      const zAxis = BABYLON.Mesh.CreateLines(
        'z', [worldOrigin, (BABYLON.Axis.Z).scale(size)], this.scene);

      const qAxis = BABYLON.Mesh.CreateLines(
        'q', [worldOrigin, (BABYLON.Axis.Z).scale(size * 50)], this.scene);
      const rAxis = BABYLON.Mesh.CreateLines(
        'r', [worldOrigin, (new BABYLON.Vector3(41.569, 0, 24).scale(size * 50))], this.scene);

      xAxis.color = BABYLON.Color3.Red();
      yAxis.color = BABYLON.Color3.Green();
      zAxis.color = BABYLON.Color3.Blue();

      qAxis.color = BABYLON.Color3.Magenta();
      rAxis.color = BABYLON.Color3.Yellow();

      this.map = new HexagonMap({
        hexagonSize: 24,
        scene: this.scene,
        size: { width: 5, height: 5 },
        type: HexTools.HexagonGridType.TRIANGLE
      });

      // let tile: HexagonalTile;
      // const tiles: BABYLON.Mesh[] = [];

      // for (let z = 0; z < 20; z++ ) {
      //   for (let x = 0; x < 20; x++ ) {
      //     tile = this.groundTileFactory.getTitle(TileType.PLANE);
      //     tile.position = new BABYLON.Vector3(x, 0, z);
      //     tiles.push(tile.meshInstance);
      //   }
      // }
      // const grid = BABYLON.Mesh.MergeMeshes(tiles, true, true);
      // grid.material.wireframe = true;

      // tile = this.groundTileFactory.getTitle(TileType.PLANE);
      // tile.position = new BABYLON.Vector2(0, 0);
      // tile = this.groundTileFactory.getTitle(TileType.SLOPE);
      // tile.position = new BABYLON.Vector2(0, 1);

      // tile = this.groundTileFactory.getTitle(TileType.SLOPE_DOWN, TileDirection.NORTH_EAST);
      // tile.axialPosition = new HexTools.AxialVector(4, 2);
      // tiles.push(tile.meshInstance);
      // tile = this.groundTileFactory.getTitle(TileType.SLOPE_DOWN, TileDirection.EAST);
      // tile.axialPosition = new HexTools.AxialVector(3, 1);
      // tiles.push(tile.meshInstance);
      // tile = this.groundTileFactory.getTitle(TileType.SLOPE_DOWN, TileDirection.SOUTH_EAST);
      // tile.axialPosition = new HexTools.AxialVector(2, 1);
      // tiles.push(tile.meshInstance);
      // tile = this.groundTileFactory.getTitle(TileType.SLOPE_DOWN, TileDirection.SOUTH_WEST);
      // tile.axialPosition = new HexTools.AxialVector(2, 2);
      // tiles.push(tile.meshInstance);
      // tile = this.groundTileFactory.getTitle(TileType.SLOPE_DOWN, TileDirection.WEST);
      // tile.axialPosition = new HexTools.AxialVector(2, 3);
      // tiles.push(tile.meshInstance);
      // tile = this.groundTileFactory.getTitle(TileType.SLOPE_DOWN, TileDirection.NORTH_WEST);
      // tile.axialPosition = new HexTools.AxialVector(3, 3);
      // tiles.push(tile.meshInstance);
      // tile = this.groundTileFactory.getTitle(TileType.PLANE, TileDirection.NORTH);
      // tile.axialPosition = new HexTools.AxialVector(3, 2);
      // tiles.push(tile.meshInstance);

      // this.grid = BABYLON.Mesh.MergeMeshes(tiles, true, true);
      // this.grid.material.wireframe = true;

      // const scale = 40;
      // const ground = BABYLON.Mesh.CreateGround('ground1', 48 * scale, 48 * scale, 2, this.scene);
      // const material = new BABYLON.StandardMaterial('texture1', this.scene);
      // const diffuseTexture = new BABYLON.Texture('assets/textures/seamless-hex.jpg', this.scene);
      //
      // material.specularColor = new BABYLON.Color3(0, 0, 0);
      // diffuseTexture.uScale = 0.25 * scale;
      // diffuseTexture.vScale = 0.25 * scale;
      // // diffuseTexture.uAng = 0;
      // // diffuseTexture.vAng = 5.0;
      //
      // material.diffuseTexture = diffuseTexture;
      // ground.material = material;
      // // ground.material.wireframe = true;
      // ground.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 3, BABYLON.Space.WORLD);

      // const hexagon = BABYLON.MeshBuilder.CreateDisc(
      //   'hexagon', { radius : 24 * 2, tessellation: 6, updatable: true }, this.scene);
      // const positionFunction = (positions: [any]) => {
      //   // modify positions array values here
      //   // positions[0] = 48;
      //   // positions[1] = 48;
      //   // positions[2] -= 24;
      //   // positions[5] -= 24;
      //   // positions[8] -= 24;
      //   positions[11] -= 24;
      //   positions[14] -= 24;
      //   console.log(positions);
      // };
      // hexagon.updateMeshPositions(positionFunction, true);
      // const material = new BABYLON.StandardMaterial('texture1', this.scene);
      // material.specularColor = new BABYLON.Color3(0, 0, 0);
      // // material.diffuseColor = new BABYLON.Color3(128, 128, 128);
      // hexagon.material = material;
      // hexagon.material.wireframe = true;
      // hexagon.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2, BABYLON.Space.WORLD);
      // hexagon.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 6, BABYLON.Space.WORLD);

      // tile = BABYLON.MeshBuilder.CreatePlane('tile', {height : 80.5, width: 72}, this.scene);
      // tile.position = new BABYLON.Vector3(5 * 72, 8, 5 * 72);
      // tile.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2, BABYLON.Space.WORLD);
      // tile.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 12, BABYLON.Space.WORLD);

      // const i = 4;
      // const ground = BABYLON.Mesh.CreateTiledGround(
      //   "ground",
      //   -4 * i, -4 * i,
      //   4 * i, 4 * i,
      //   {w: 4 * i, h: 4 * i},
      //   {w: 4, h: 4},
      //   this.scene, true);
      // ground.enableEdgesRendering(.9999999999);

      // let sphere = BABYLON.Mesh.CreateSphere("Sphere0", 32, 3, this.scene);
      // let cylinder = BABYLON.Mesh.CreateCylinder("Sphere1", 5, 3, 2, 32, 1, this.scene);
      // let torus = BABYLON.Mesh.CreateTorus("Sphere2", 3, 1, 32, this.scene);

      // sphere.material = this.cellShadingMaterial;
      // sphere.position = new BABYLON.Vector3(-10, 0, 0);
      // sphere.renderOutline = true;
      // sphere.outlineColor = BABYLON.Color3.FromHexString("#000000");
      // sphere.outlineWidth = .05;
      //
      // cylinder.material = this.cellShadingMaterial;
      // cylinder.renderOutline = true;
      // cylinder.outlineColor = BABYLON.Color3.FromHexString("#000000");
      // cylinder.outlineWidth = .05;
      //
      // torus.material = this.cellShadingMaterial;
      // torus.position = new BABYLON.Vector3(10, 0, 0);
      // torus.renderOutline = true;
      // torus.outlineColor = BABYLON.Color3.FromHexString("#000000");
      // torus.outlineWidth = .05;
      //
      // let alpha = 0;
      // this.scene.registerBeforeRender(() => {
      //   sphere.rotation.y = alpha;
      //   sphere.rotation.x = alpha;
      //   cylinder.rotation.y = alpha;
      //   cylinder.rotation.x = alpha;
      //   torus.rotation.y = alpha;
      //   torus.rotation.x = alpha;
      //
      //   alpha += 0.005;
      // });

      this.animate();
    });

    window.addEventListener('click', () => {
      const pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
      if (pickResult.pickedMesh) {
        // this.grid.markVerticesDataAsUpdatable(BABYLON.VertexBuffer.PositionKind, true);
        // this.grid.markVerticesDataAsUpdatable(BABYLON.VertexBuffer.NormalKind, true);
        // this.grid.updateMeshPositions((positions: number[]) => {
        //   console.log('pickedPoint', pickResult.pickedPoint);
        //   positions[2] += 50;
        //   // for (let i = 0; i < positions.length / 3; i++) {
        //   //   if (Math.round(positions[i]) === Math.round(pickResult.pickedPoint.x)) {
        //   //   // Math.round(positions[i + 1]) === Math.round(pickResult.pickedPoint.y) &&
        //   //   // Math.round(positions[i + 2]) === Math.round(pickResult.pickedPoint.z)) {
        //   //     positions[i] += 100;
        //   //     // positions[i + 1] += 100;
        //   //     // positions[i + 2] += 100;
        //   //   }
        //   // }
        // }, true);
        // this.grid.markVerticesDataAsUpdatable(BABYLON.VertexBuffer.PositionKind, false);
        // this.grid.markVerticesDataAsUpdatable(BABYLON.VertexBuffer.NormalKind, false);

        const position = this.map.pointToAxial(
          new HexTools.Point(pickResult.pickedMesh.position.z, pickResult.pickedMesh.position.x));
        TerraformTools.elevateTile(position, this.map);
        // TerraformTools.lowerTile(position, this.map);
        // pickResult.pickedMesh.edgesWidth = 4.0;
        // pickResult.pickedMesh.enableEdgesRendering();
      }
    });
  }

  private initCamera() {
    this.camera = new Camera(this.scene, this.canvas);

    // this.camera.attachPostProcess(new BABYLON.FxaaPostProcess(
    //   'fxaa', 2.0, this.camera, BABYLON.Texture.TRILINEAR_SAMPLINGMODE , this.engine, false));
  }

  private initLight() {
    // create a basic light, aiming 0,1,0 - meaning, to the sky
    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);
    // this.light = new BABYLON.PointLight('Omni', new BABYLON.Vector3(20, 3200, 2), this.scene);
  }

  // private initMaterial() {
  //   this.cellShadingMaterial = new BABYLON.ShaderMaterial(
  //     'cellShading', this.scene, './assets/shaders/cellShading',
  //   {
  //     samplers: ['textureSampler'],
  //     uniforms: ['world', 'viewProjection']
  //   });
  //   this.cellShadingMaterial
  //    .setTexture('textureSampler', new BABYLON.Texture('./assets/models/Bot/Bot.png', this.scene))
  //    .setVector3('vLightPosition', this.light.position)
  //    .setFloats('ToonThresholds', [0.95, 0.5, 0.2, 0.03])
  //    .setFloats('ToonBrightnessLevels', [1.0, 0.8, 0.6, 0.35, 0.01])
  //    .setColor3('vLightColor', this.light.diffuse);
  // }

  private animate() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }
}
