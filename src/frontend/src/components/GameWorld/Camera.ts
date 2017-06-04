import * as BABYLON from 'babylonjs';

export default class Camera {
  public arcRotateCamera: BABYLON.ArcRotateCamera;
  protected scene: BABYLON.Scene;
  protected canvas: HTMLCanvasElement;

  constructor(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
    this.scene = scene;
    this.canvas = canvas;

    this.init();
  }

  protected init() {
    // const camera = new BABYLON.FreeCamera(
    // 'camera1', new BABYLON.Vector3(0, 150, -140), this.scene);

    this.arcRotateCamera = new BABYLON.ArcRotateCamera(
      'ArcRotateCamera',
      0, Math.PI / 2 - 0.463646716, 1000,
      BABYLON.Vector3.Zero(), this.scene);
    this.arcRotateCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

    /* Lock camera rotation */
    // camera.upperAlphaLimit = Math.PI / 4;
    // camera.lowerAlphaLimit = Math.PI / 4;
    // camera.upperBetaLimit = 1;
    // camera.lowerBetaLimit = 1;

    /* Disable control camera from keyboard */
    this.arcRotateCamera.keysUp = [];
    this.arcRotateCamera.keysDown = [];
    this.arcRotateCamera.keysLeft = [];
    this.arcRotateCamera.keysRight = [];

    // camera.wheelPrecision = 0;

    const cameraDistance = 62;
    this.arcRotateCamera.orthoTop = cameraDistance * this.canvas.height / 100;
    this.arcRotateCamera.orthoBottom = -1 * cameraDistance * this.canvas.height / 100;
    this.arcRotateCamera.orthoLeft = -1 * cameraDistance * this.canvas.width / 100;
    this.arcRotateCamera.orthoRight = cameraDistance * this.canvas.width / 100;

    this.arcRotateCamera.attachControl(this.canvas, false, false);
  }
}
