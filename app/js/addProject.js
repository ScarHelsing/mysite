var module = (function(){

	var init = function() {
		// what should happen immediately
		_setUpListeners();
	};

	var _setUpListeners = function(){
		// open modal windows
		$('.new-project').on('click', _showModal);
	};

	var _showModal = function(e){
		console.log('modal window');
		e.preventDefault();
		$('.add-project-popup').bPopup({
			speed: 650,
			transition: 'slideDown'
		});
	};

	return {
		init : init,
	};

})();

module.init();