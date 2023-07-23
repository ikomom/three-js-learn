import * as THREE from 'three'
import gsap from "gsap";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

function registerListener() {
  window.addEventListener('resize', () => {
    Object.assign(sizes, {
      width: window.innerWidth,
      height: window.innerHeight
    })
    console.log('resize', sizes)
    // camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // size
    renderer.setSize(sizes.width, sizes.height)
    // handle different screen move
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  const fullScreen = {
    get enabled() {
      return !!(document.fullscreenElement || document.webkitFullscreenElement)
    },
    request() {
      let element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.msRequestFullscreen) { // IE11
        element.msRequestFullscreen()
      } else {
        window.alert('your browser not support requestFullscreen')
      }
    },
    exit() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else {
        window.alert('your browser not support exitFullscreen')
      }
    }
  }

  window.addEventListener('dblclick', () => {
    console.log('dbclick', document.fullscreenElement)
    if (fullScreen.enabled) {
      fullScreen.exit()
    } else {
      fullScreen.request()
    }
  })


// Cursor
// const cursor = {x: 0, y: 0}
// window.addEventListener('mousemove', (event) => {
//   cursor.x = event.clientX / sizes.width - 1
//   cursor.y = event.clientY / sizes.height - 0.5
//   console.log(cursor)
// })
}
registerListener()

// Canvas
const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// group
function addGroup() {
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
  return group
}
const group = addGroup()
/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.001, 100);

// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, aspectRatio, 1, -1, 0.1, 100)

camera.position.set(0, 0, 4)

scene.add(camera)
// camera.lookAt(new THREE.Vector3(1, 0, 0))

// const helper = new THREE.CameraHelper(camera);
// const colorBlue = new THREE.Color('blue')
// helper.setColors(colorBlue, colorBlue, colorBlue, colorBlue, colorBlue)
// scene.add(helper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

// let time = Date.now()
// group.position
// animate
// gsap.to(group.position, {y: 2, duration: 1, delay: 1})
// gsap.to(group.position, {y: 0, duration: 1, delay: 2})
const control = new OrbitControls(camera, canvas)
control.enableDamping = true
// control.target = new THREE.Vector3(0, 1, 2)// rotate target
// control.update()
function animate() {
  // const elapsedTime = clock.getElapsedTime()
  // time cost
  // const currentTime = Date.now()
  // const deltaTime = currentTime - time
  // time = currentTime
  // console.log(deltaTime)

  // move
  // group.rotation.y -= 0.001 * deltaTime
  // group.rotation.x = elapsedTime
  // group.position.y = Math.sin(elapsedTime)
  // group.position.x = Math.cos(elapsedTime)
  // camera.lookAt(group.position)

  // update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI) * 3
  // camera.position.y = - cursor.y* 2
  // camera.position.x = cursor.x * 10
  // camera.position.y = - cursor.y* 10
  // camera.lookAt(group.position)

  // update control
  control.update()

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
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
