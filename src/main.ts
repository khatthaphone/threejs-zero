import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()

const cubeGerometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

const cubeMesh = new THREE.Mesh(cubeGerometry, cubeMaterial)
cubeMesh.position.z = 1
cubeMesh.position.x = 1
cubeMesh.position.y = 1

scene.add(cubeMesh)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30)
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 30)

camera.position.z = 5

const canvas = document.querySelector('canvas.threejs') as HTMLCanvasElement

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// controls.autoRotate = true

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)

console.log('device pixel ratio:', window.devicePixelRatio)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

const renderLoop = () => {

  // cubeGerometry.scale(1.0001, 1.0001, 1.0001)

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderLoop)
}

renderLoop()

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

// function animate() {
//   requestAnimationFrame(animate)
//   controls.update()
//   renderer.render(scene, camera)
// }