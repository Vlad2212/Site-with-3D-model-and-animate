import * as THREE from 'three';
// ИПОРТ УПРАВЛЕНИЯ
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls.js';
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
// import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// ИМПОРТ СВЕТА
// import {RectAreaLightUniformsLib} from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
// import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper.js';


// ИПОРТ ТЕКСТУР
// import { TextureLoader } from 'three';
// import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader.js';
// import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
// import bgStars from '../img/bg-stars.jpg';
// import bgTexture from '../img/3dbg.jpg';
const hdrTextureURL = new URL('../assets/peppermint_powerplant_2_8k.hdr', import.meta.url);



// ИМПОРТ ПОМОШНИКА
// import * as dat from 'dat.gui';



// ИМПОТР СТОРОННИХ БИБЛИОТЕК
// import  * as CANNON from 'cannon-es';
// import * as YUKA from 'yuka';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Константы
import { Clock } from 'three/src/core/Clock.js'
import { ACESFilmicToneMapping } from 'three';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    premultipliedAlpha: false,
  });
  // RectAreaLightUniformsLib.init();
  renderer.shadowMap.enabled = true;
  const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 0, -20);
camera.lookAt(0, 0, 0);


  scene.background = 'black';


  // КОНТРОЛЬ СЦЕНЫ

// Орбит контроль
// const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.update();

// Акрбалл контроль
// const arcControls = new ArcballControls( camera, renderer.domElement, scene );
// arcControls.addEventListener( 'change', function () {renderer.render( scene, camera );});
// arcControls.update();


// Помощник ОСЕЙ
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);


// // СВЕТ
{class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

function makeXYZGUI(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
  folder.add(vector3, 'y', -10, 10).onChange(onChangeFn);
  folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
  folder.open();
}
// AmbientLight
{
  // const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
  // scene.add(ambientLight);
}

// PointLight
let leftPointLigth;
{
    const color = 0xFFFFFF;
    const intensity = 0;
    leftPointLigth = new THREE.PointLight(color, intensity);
    leftPointLigth.position.set(-6, 2, 5.3);
    scene.add(leftPointLigth);
 
    
    // const helper = new THREE.PointLightHelper(leftPointLigth);
    // scene.add(helper);

    // function updateLight() {
    //   helper.update();
    // }

    // const gui = new dat.GUI();
    // gui.addColor(new ColorGUIHelper(leftPointLigth, 'color'), 'value').name('color');
    // gui.add(leftPointLigth, 'intensity', 0, 10, 0.01);
    // gui.add(leftPointLigth, 'distance', 0, 40).onChange(updateLight);

    // makeXYZGUI(gui, leftPointLigth.position, 'position');
  }



// DirectionLigth
let dLight;
{
    const color = 0xFFFFFF;
    const intensity = 4;
    dLight = new THREE.DirectionalLight(color, intensity);
    dLight.position.set(0, 10, 0);
    dLight.target.position.set(0, 4, 0);
    scene.add(dLight);
    scene.add(dLight.target);


  //  const helper = new THREE.DirectionalLightHelper(dLight);
  // scene.add(helper);

  // const onChange = () => {
  //   dLight.target.updateMatrixWorld();
  //   helper.update();
  // };
  // onChange();

  // const gui = new dat.GUI();
  // gui.addColor(new ColorGUIHelper(dLight, 'color'), 'value').name('color');
  // gui.add(dLight, 'intensity', 0, 10, 0.01);

  // makeXYZGUI(gui, dLight.position, 'position', onChange);
  // makeXYZGUI(gui, dLight.target.position, 'target', onChange);


  // const cameraHelper = new THREE.CameraHelper(dLight.shadow.camera);
  // scene.add(cameraHelper);
 
};





{
  // const color = 0xFFFFFF;
  // const intensity = 1;
  // const width = 12;
  // const height = 4;
  // const light = new THREE.RectAreaLight(color, intensity, width, height);
  // light.position.set(0, 10, 0);
  // light.rotation.x = THREE.MathUtils.degToRad(-90);
  // scene.add(light);

  // const helper = new RectAreaLightHelper(light);
  // light.add(helper);

  // const gui = new dat.GUI();
  // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
  // gui.add(light, 'intensity', 0, 10, 0.01);
  // gui.add(light, 'width', 0, 20);
  // gui.add(light, 'height', 0, 20);
  // // gui.add(new DegRadHelper(light.rotation, 'x'), 'value', -180, 180).name('x rotation');
  // // gui.add(new DegRadHelper(light.rotation, 'y'), 'value', -180, 180).name('y rotation');
  // // gui.add(new DegRadHelper(light.rotation, 'z'), 'value', -180, 180).name('z rotation');

  // makeXYZGUI(gui, light.position, 'position');
}



// SpotLight
{
  const color = 0xFFFFFF;
  const intensity = 5;
  const light = new THREE.SpotLight(color, intensity);
  light.position.set(0, 0, 100);
  light.target.position.set(0, 0, 0);
  scene.add(light);
  scene.add(light.target);

}

// HemisphereLight
let hemisphereLight;
{
    const skyColor = 0xB1E1FF;  // светло-синий
    const groundColor = 'white';  // коричневато-оранжевый
    const intensity = 5;

    hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(hemisphereLight);
}
}



// gsap.to('.scroll__popup', {y:-5, duration: 0.4,  yoyo: true, repeat: -1, ease:'linear'})




  // Объекты
const progressBar = document.getElementById('progress-bar');





  const loadingManager = new THREE.LoadingManager();
  const gltfloader = new GLTFLoader(loadingManager);

  loadingManager.onProgress = function(url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
  }

  const progressBarContainer = document.querySelector('.progress-bar-container');

  loadingManager.onLoad = function() {
    progressBarContainer.style.display = 'none';
  }

  const rgbeLoader = new RGBELoader();

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  
  const loader = new RGBELoader();
  loader.load(hdrTextureURL, function(texture) {
      texture.mapping = THREE.EquirectangularRefractionMapping;
    //   scene.background = texture;
      scene.environment = texture;
      
      
      gltfloader.load('./assets/scene.gltf', function(gltf) {
        const model = gltf.scene;
    
        model.scale.set(10, 10, 10);
        model.position.set(0, 5, 0);
        scene.add(model);
        model.getObjectByName('Frame_Frame_0')
    
        
          
    
        let tl = gsap.timeline({
        
          scrollTrigger: {
            trigger: ".section",
            pin: true,   
            start: "top top", 
            end: "+=4000", 
            scrub: 1, 
            snap: {
              snapTo: "labelsDirectional", // snap to the closest label in the timeline
              delay: 0.3
            }
          }
        });
    
        tl.addLabel("start")
        
          tl.to(model.rotation, {y: -1, duration: 1})
          tl.to('.content__first', {opacity: 1, y: -10})
        tl.addLabel("unpack")
          
          tl.to(model.getObjectByName('Frame_Frame_0').position, {z: .4})
          tl.to(model.getObjectByName('Camera').position, {z: 0.1}, '<')
          tl.to(model.getObjectByName('Camera001').position, {z: 0.2}, '<')
          tl.to(model.getObjectByName('Apple_Logo_Logo_0').position, {z: 0.3}, '<')
          tl.to(model.getObjectByName('Body_Wallpaper_0').position, {z: -0.3}, '<')
          tl.to(model.getObjectByName('Body_Body_0').position, {z: -0.2}, '<')
          
        tl.addLabel("rotatate")
          tl.to(model.rotation, {y: 4, duration: 2})
          
        tl.addLabel("pack")
          
          tl.to(model.rotation, {y: 4.8})
          tl.to('.content__first', {opacity: 0, y: -30},'<')
          tl.to(model.getObjectByName('Frame_Frame_0').position, {z: 0})
          tl.to(model.getObjectByName('Camera').position, {z: 0}, '<')
          tl.to(model.getObjectByName('Camera001').position, {z: 0}, '<')
          tl.to(model.getObjectByName('Apple_Logo_Logo_0').position, {z: 0}, '<')
          tl.to(model.getObjectByName('Body_Wallpaper_0').position, {z: 0}, '<')
          tl.to(model.getObjectByName('Body_Body_0').position, {z: 0}, '<')
          tl.to(model.getObjectByName('Apple_Logo_Logo_0').position, {z: 0},'<')
          tl.to('.content__second', {opacity: 1, y: 0},'<')
    
          tl.addLabel("scaleStart")
            tl.to(model.scale, {x:15, y: 15, z:15})
            tl.to(model.rotation, {y: 3.5})
        tl.addLabel("end")
      });

  })


 
  
 
  
  

    
   
  

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();