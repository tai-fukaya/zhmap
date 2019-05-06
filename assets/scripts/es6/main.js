import jQuery from 'jQuery';
import settings from './setting';
import WebGLCanvas from './WebGLCanvas';

(($) => {
	let $searchId = $('#search_id'),
		$ministry = $('#ministry'),
		$province = $('#province'),
		$city = $('#city'),
		$town = $('#town');
	// 地図表示エリア
	let MapArea = new WebGLCanvas(window.innerWidth, window.innerHeight, $);
	$('body').append(MapArea.renderer.domElement);

	function render() {
		MapArea.animate();
		requestAnimationFrame(render);
	}
	render();

	$searchId.on('keyup', (e) => {
		let info = MapArea.visualizer.search($searchId.val());
		let place = info.place || {};

		$ministry.text(place.ministry || "");
		$province.text(place.province || "");
		$city.text(place.city || "");
		$town.text(place.town || "");
	}).focus();

	$(window).on('resize', (e) => {
		MapArea.resize(window.innerWidth, window.innerHeight);
	});
})(jQuery);
