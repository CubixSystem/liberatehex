import * as BABYLON from 'babylonjs';

import AssetsManager from './AssetsManager';
import Camera from './Camera';
import {
  GroundTileFactory,
  HexagonalTile,
  TileType
} from './Tile';

export class Game {
  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private camera: Camera;
  private light: BABYLON.Light;
  private assetsManager: AssetsManager;
  private groundTileFactory: GroundTileFactory;
  // private cellShadingMaterial: BABYLON.ShaderMaterial;

  constructor(canvas: HTMLCanvasElement) {
    // Create canvas and engine
    this.canvas = canvas;
    this.engine = new BABYLON.Engine(this.canvas, true);
  }

  public createScene() {
    this.scene = new BABYLON.Scene(this.engine);
    this.groundTileFactory = new GroundTileFactory({scene: this.scene});
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

      xAxis.color = BABYLON.Color3.Red();
      yAxis.color = BABYLON.Color3.Green();
      zAxis.color = BABYLON.Color3.Blue();

      let tile: HexagonalTile;
      for (let z = 0; z < 10; z++ ) {
        for (let x = 0; x < 10; x++ ) {
          tile = this.groundTileFactory.getTitle(TileType.PLANE);
          tile.position = new BABYLON.Vector2(x, z);
        }
      }

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

    // When click event is raised
    window.addEventListener('click', () => {
      // We try to pick an object
      const pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
      if (pickResult.pickedMesh) {
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
