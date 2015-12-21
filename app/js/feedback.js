var feedback = (function(){

	var init = function(){
		// what should happen immediately
		_setUpListeners();
	};

	var _setUpListeners = function(){
		$('#feedback').on('submit', _submitForm);
	};

	var _submitForm = function(e){
		e.preventDefault();
		console.log('Отправка формы');
		console.log($(this));

		var form = $(this),
				url = 'feedback.php',
				defObj = _ajaxForm(form, url);

		console.log('feedback.js, проверяю форму!');
		console.log(form);

		// что-то будем делать с ответом от сервера defObj
	};

	var _ajaxForm = function(form, url){
		console.log('ajax-запрос, н ос проверкой!');
		if(!validation.validateForm(form)){
			return false;
			// если false, то код ниже не произойдёт никогда
		};

	};

	return {
		init : init
	};

})();

feedback.init();