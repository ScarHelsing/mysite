var module = (function(){

	// Initialize our module
	var init = function() {
		// what should happen immediately
		_setUpListeners();
	};

	// Listen events
	var _setUpListeners = function(){
		// open modal windows
		$('.new-project').on('click', _showModal),
		// add project
		$('.add-project-form').on('submit', _addProject);
	};

	// Interact with modal window
	var _showModal = function(e){
		console.log('modal window');
		e.preventDefault();
		var divPopup = $('.add-project-popup'),
				form = divPopup.find('form');

		divPopup.bPopup({
			speed: 650,
			transition: 'slideDown',
			onClose: function() {
				form.find('.server-mes').text('').hide();
				form.trigger('reset');
			}
		});
	};

	// Add project
	var _addProject = function(e) {
		console.log('addProject');
		e.preventDefault();

		var form = $(this),
				url = 'js/add_project.php',
				defObj = _ajaxForm(form, url);

		// проверка, был ли запрос на сервер
		if (defObj) {
			defObj.done(function(ans){
				console.log(ans);

				var successBox = form.find('.success-mes'),
						errorBox = form.find('.error-mes');
				if (ans.status === 'OK') {
					successBox.text(ans.text).show();
					errorBox.hide();
				} else {
					errorBox.text(ans.text).show();
					successBox.hide();
				}
			})
		};

	};

	// Универсальна функция
	// Для работы использовано:
		// @form - форма
		// @form - адрес php-файла, к которому обращаемся
	// Universal function:
		// 1. Собирает данные из формы
		// 2. Проверяет форму
		// 3. Делает запрос на сервер и возвращает ответ с сервера
	var _ajaxForm = function(form, url) {

		if(!validation.validateForm(form)){
			return false;
			// если false, то код ниже не произойдёт никогда
		};

		data = form.serialize();

		var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail(function(){
			console.log('error');
		});

		return result;
	};

	// Возвращаем объект (публичные методы)
	return {
		init : init,
	};

})();

module.init();