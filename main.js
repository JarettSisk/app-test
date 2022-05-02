import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// instantiate scene
const scene = new THREE.Scene();
// instantiate camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// set camera position
camera.position.setZ(1);
// NOTE: for this project we dont need a light (yet)

// instantiate renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})
// set pixel ratio and size for renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// instantiate orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;


// room logic
const room1Button = document.querySelector(".room1");
const room2Button = document.querySelector(".room2");

const changeRoom = (e) => {
  // room mesh setup
  const geometry = new THREE.SphereGeometry( 500, 60, 40 );
  geometry.scale( - 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( {
    map: new THREE.TextureLoader().load(`${e.target.innerText}.jpg`),
  } );
  const mesh = new THREE.Mesh( geometry, material );
  // remove previous mesh and add new
  scene.remove( mesh )
  scene.add( mesh );
}

// event listiners
room1Button.addEventListener('click', function (e) {
  changeRoom(e)
});

room2Button.addEventListener('click', function (e) {
  changeRoom(e)
});

// animate
renderer.setAnimationLoop( function () {

	renderer.render( scene, camera );
  controls.update();

} );
