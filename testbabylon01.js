var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};

const createScene = function () {
  const radian = 0.0174533;

  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    new BABYLON.Vector3(0, 0, 0)
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0)
  );

  //BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
  //BABYLON.SceneLoader.ImportMeshAsync("semi_house", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
  //BABYLON.SceneLoader.ImportMeshAsync("ground", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
  BABYLON.SceneLoader.ImportMeshAsync(
    ["semi_house", "ground"],
    "https://assets.babylonjs.com/meshes/",
    "both_houses_scene.babylon"
  );

  const yeti1 = BABYLON.SceneLoader.ImportMesh(
    "",
    Assets.meshes.Yeti.rootUrl,
    Assets.meshes.Yeti.filename,
    scene,
    function (newMeshes) {
      newMeshes[0].position = new BABYLON.Vector3(-1.2, 0, 0);
      newMeshes[0].scaling = new BABYLON.Vector3(0.025, 0.04, 0.04);
      newMeshes[0].rotation = new BABYLON.Vector3(
        0 * radian,
        90 * radian,
        0 * radian
      );
    }
  );

  const yeti2 = BABYLON.SceneLoader.ImportMesh(
    "",
    Assets.meshes.Yeti.rootUrl,
    Assets.meshes.Yeti.filename,
    scene,
    function (newMeshes) {
      newMeshes[0].position = new BABYLON.Vector3(3, 0, 0);
      newMeshes[0].scaling = new BABYLON.Vector3(0.025, 0.04, 0.04);
      newMeshes[0].rotation = new BABYLON.Vector3(
        0 * radian,
        -90 * radian,
        0 * radian
      );
    }
  );

  const yeti3 = BABYLON.SceneLoader.ImportMesh(
    "",
    Assets.meshes.Alien.rootUrl,
    Assets.meshes.Alien.filename,
    scene,
    function (newMeshes) {
      newMeshes[0].position = new BABYLON.Vector3(1, 2, -.5);
      newMeshes[0].scaling = new BABYLON.Vector3(1, 1, 1);
      newMeshes[0].rotation = new BABYLON.Vector3(
        20 * radian,
        180 * radian,
        0 * radian
      );
    }
  );

  //yeti3.newMeshes[0].position = new BABYLON.Vector3(1, -1, 0);

  return scene;
};
window.initFunction = async function () {
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  window.engine = await asyncEngineCreation();
  if (!engine) throw "engine should not be null.";

  startRenderLoop(engine, canvas);
  window.scene = createScene();
};
initFunction().then(() => {
  sceneToRender = scene;
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
