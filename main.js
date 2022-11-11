import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { arraySlice } from 'three/src/animation/AnimationUtils';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347} );
const torus = new THREE.Mesh(geometry, material); 

scene.add(torus)

//lighting

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//grid and prespective

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper, gridHelper)

// moving around in the 3d space with the mouse
const controls = new OrbitControls(camera, renderer.domElement);


// function for random generatio of geometry(stars)

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100))

  star.position.set(x, y, z);
  scene.add(star)

}
Array(600).fill().forEach(addStar)

//backgound

const spaceTexture = new THREE.TextureLoader().load('background.png');
scene.background = spaceTexture;


//avatar texture mapping
const ivanTexture = new THREE.TextureLoader().load('ivan.png');

const ivan = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map:ivanTexture})
  
  
);

ivan.rotation.y += 0.01;
  ivan.rotation.z += 0.01;

scene.add(ivan);

//sun
const sunTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normalMapSun.png')

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture
  })
);
scene.add(sun)

sun.position.z = 10;
sun.position.setX(60);

//sun2

const sun2 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture
  })
);
scene.add(sun2)


// sun2 positioning
sun2.position.z = 40;
sun2.position.setX(-20);

//sun3 



const sun3 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture
  })
);
scene.add(sun3)


// sun2 positioning
sun3.position.z = 20;
sun3.position.x = 30
sun3.position.setX(-20);

//camera movement 

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  sun.rotation.x += 0.05;
  sun.rotation.y += 0.075;
  sun.rotation.z += 0.05;

  ivan.rotation.y += 0.01;
  ivan.rotation.z += 0.01;
  
  camera.position.z = t * -0.01; 
  camera.position.x = t * -0.01; 
  camera.position.y = t * -0.0001; 

}
document.body.onscroll = moveCamera

// animation of the geometry
function animate(){
  requestAnimationFrame( animate )

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
controls.update();

ivan.rotation.y += 0.003;
  ivan.rotation.z += 0.003;

  sun.rotation.y += 0.01;
  sun.rotation.z += 0.01;

  sun2.rotation.y += 0.01;
  sun2.rotation.z += 0.01;

  sun3.rotation.y += 0.01;
  sun3.rotation.z += 0.01;

  renderer.render( scene, camera);
}

animate()