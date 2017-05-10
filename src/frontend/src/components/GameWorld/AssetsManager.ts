import * as BABYLON from 'babylonjs';

export default class AssetsManager {
  protected assetsManager: BABYLON.AssetsManager;
  protected scene: BABYLON.Scene;

  constructor(scene: BABYLON.Scene) {
    this.scene = scene;
    this.assetsManager = new BABYLON.AssetsManager(this.scene);
    this.assetsManager.useDefaultLoadingScreen = false;

    const OBJFileLoader: { OPTIMIZE_WITH_UV: boolean } = BABYLON.OBJFileLoader;
    OBJFileLoader.OPTIMIZE_WITH_UV = true;
  }

  public init() {
    return new Promise((resolve) => {
      const assetsPath = '/assets/models/';
      let meshesPool: BABYLON.AbstractMesh[] = [];

      BABYLON.SceneLoader.ImportMesh(
        '', `${assetsPath}Cube/`, 'Cube.babylon', this.scene,
        (meshes: BABYLON.Mesh[]) => {
          meshes[0].rotate(new BABYLON.Vector3(0, 1, 0),  Math.PI + Math.PI / 6, BABYLON.Space.WORLD);
          meshes[0].position.y += 60;

          let bot: BABYLON.InstancedMesh;
          for (let z = 0; z < 10; z++ ) {
            for (let x = 0; x < 10; x++ ) {
              bot = meshes[0].createInstance('bot');
              bot.position = new BABYLON.Vector3(x * 96, 60, z * 96);
            }
          }
          // meshes[0].scaling = new BABYLON.Vector3(2, 2, 2);
          // meshes[0].scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
          // meshes[0].scaling = new BABYLON.Vector3(2, 2, 2);
          // console.log(meshes);
          // const size = meshes[0].getBoundingInfo().boundingBox.extendSize;
          // console.log(size);
          meshesPool = meshesPool.concat(meshes);
        });

      // BABYLON.SceneLoader.ImportMesh(
      //   '', `${assetsPath}Rifle/`, 'Rifle.babylon', this.scene,
      //   (meshes) => {
      //     meshes[0].scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
      //     // meshes[0].scaling = new BABYLON.Vector3(2, 2, 2);
      //     meshes[0].rotate(new BABYLON.Vector3(0, 0, -1), Math.PI / 2, BABYLON.Space.WORLD);
      //     meshes[0].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2, BABYLON.Space.WORLD);
      //     meshes[0].rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2, BABYLON.Space.WORLD);
      //     // meshes[0].position = new BABYLON.Vector3(, , );
      //     meshes[0].position.x += 16;
      //     meshes[0].position.y += 76;
      //     meshes[0].position.z += 30;
      //     // meshes[0].position.y += 70;
      //   });

      //     const servoBase = this._scene.getMeshByName('Servo_base');
      //     const servoAxis = this._scene.getMeshByName('Servo_axis');
      //     servoBase.position.y = 6;
      //     servoBase.position.x = 0;
      //     servoBase.position.z = 14;

      this.assetsManager.onFinish = () => resolve(meshesPool);
      this.assetsManager.load();
    });
  }
}
