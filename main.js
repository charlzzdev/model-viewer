const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const loader = new THREE.OBJLoader();
loader.load("./models/GewehrOBJversion.obj", obj => {
  obj.rotation.x = 4.65;
  obj.castShadow = true;
  obj.receiveShadow = true;
  obj.scale.set(-1, 1, 1);

  scene.add(obj);

  function animate() {
    let id = requestAnimationFrame(animate);
    renderer.render(scene, camera);
    renderer.setPixelRatio(window.devicePixelRatio);
    controls.update();

    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('keyup', e => {
        obj.rotation[e.target.placeholder] = e.target.value;
        renderer.render(scene, camera);
      });
    });
  }
  animate();
});

const light = new THREE.PointLight(0xffffff);
light.position.set(-50, 0, 100);
scene.add(light);

const light2 = new THREE.PointLight(0xffffff);
light2.position.set(30, 20, -70);
scene.add(light2);

camera.position.z = 100;