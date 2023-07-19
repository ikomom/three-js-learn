import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// group
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)
cube2.position.x = -2
group.add(cube2)

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.set(1.6, 0.7, 6.12)
camera.position.set(0, 0, 4)

scene.add(camera)
camera.lookAt(group.position)
// camera.lookAt(new THREE.Vector3(1, 0, 0))

const helper = new THREE.CameraHelper(camera);
const colorBlue = new THREE.Color('blue')
helper.setColors(colorBlue, colorBlue, colorBlue, colorBlue, colorBlue)
scene.add(helper);
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

function animate() {
  requestAnimationFrame(() => {
    renderer.render(scene, camera)
    animate()

  })
}

animate()

const keyhandler = (e: KeyboardEvent) => {

  const {code, keyCode} = e
  const isLeft = code === 'ArrowLeft' || code === 'KeyA' || keyCode === 37
  const isTop = code === 'ArrowUp' || code === 'KeyW' || keyCode === 38
  const isRight = code === 'ArrowRight' || code === 'KeyD' || keyCode === 39
  const isDown = code === 'ArrowDown' || code === 'KeyS' || keyCode === 40
  const isQ = code === 'keyQ' || keyCode === 81
  const isE = code === 'keyE' || keyCode === 69
  const isDigit1 = code === 'Digit1' || keyCode === 49
  const isDigit2 = code === 'Digit2' || keyCode === 50

  const isDigit3 = code === 'Digit3' || keyCode === 51
  const isDigit4 = code === 'Digit4' || keyCode === 52

  console.log('key', {code, keyCode, p: group.position, r: group.rotation})
  const isNext = isRight || isDown
  const isPre = isLeft || isTop

  if (isTop) camera.position.y += 0.1
  if (isDown) camera.position.y -= 0.1
  if (isLeft) camera.position.x += 0.1
  if (isRight) camera.position.x -= 0.1
  if (isQ) camera.position.z -= 0.1
  if (isE) camera.position.z += 0.1
  // mesh
  if (isDigit1) group.scale.x += 0.1
  if (isDigit2) group.scale.x -= 0.1
  // Euler是弧度制度，Π 180度
  if (isDigit3) group.rotation.x += Math.PI / 3
  if (isDigit4) group.rotation.x -= Math.PI / 3

  if (isNext) {
    // 点击下/右的逻辑
  }
  if (isPre) {
    // 点击上/左的逻辑
  }

}


document.addEventListener('keydown', keyhandler)
