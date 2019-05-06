import THREE from 'three';
import LatLngVisualizer from './LatLngVisualizer';
import settings from './setting';

/**
 * WebGL用のキャンバスを管理する
 */
export default class WebGLCanvas {
	/**
	 * コンストラクタ
	 * @param {string} width - 幅
	 * @param {string} height - 高さ
	 */
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.cameraFov = 60;
		let cameraZpos = this.height / 2 * Math.sqrt(3);

		// レンダラ
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0x000000, 0);
		this.renderer.domElement.style.position = "fixed";
		this.renderer.domElement.style.top = 0;
		this.renderer.domElement.style.left = 0;

		// シーン
		this.scene = new THREE.Scene();

		// カメラ
		this.camera = new THREE.PerspectiveCamera(this.cameraFov, this.width / this.height, 0.1, 1000);
		this.camera.position.z = cameraZpos;

		this.visualizer = new LatLngVisualizer(this.width, this.height, settings.jsonurl);
		this.scene.add(this.visualizer);
	}
	
	/**
	 * アニメーション
	 */
	animate() {
		this.renderer.render(this.scene, this.camera);
	}
	/**
	 * 表示サイズを変更する
	 * @param {string} width - 幅
	 * @param {string} height - 高さ
	 */
	resize(width, height) {
		this.width = width;
		this.height = height;

		this.camera.aspect = width / height;
		this.camera.position.z = height / 2 * Math.sqrt(3);
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(width, height);
		this.visualizer.resize(width, height);
	}
};