var validation = (function(){

	var init = function(){
		// what should happen immediately
		_setUpListeners();
	};

	var _setUpListeners = function(){
		$('form').on('keydown', '.has-error', _removeError);
		$('form').on('reset', _clearForm);
	};

	var _removeError = function(){
		$(this).removeClass('has-error');
	};

	var _clearForm = function(){
		var form = $(this);
		form.find('input, textarea').trigger('hideTooltip');
		form.find('.has-error').removeClass('has-error');
	};

	// Создаёт тултипы
	var _createQtip = function(element, position){
		if(position === 'right'){
			position = {
				my: 'left center',
				at: 'right center'
			}
		} else {
			position = {
				my: 'right center',
				at: 'left center',
				adjust: {
					method: 'shift none'
				}
			}
		}

		// инициализация тултипа
		element.qtip({
			content: {
				text: function(){
					return $(this).attr('qtip-content');
				}
			},
			show: {
				event: 'show'
			},
			hide: {
				event: 'keydown hideTooltip'
			},
			position: position,
			style: {
				classes: 'qtip-mystyle qtip-rounded',
				tip: {
					height: 10,
					width: 16
				}
			}
		}).trigger('show');
	};

	// Универсальная функция
	var validateForm = function(form){

		var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
				valid = true;

				// Пройдёмся по всем элементам формы
				$.each(elements, function(index, val){
					var element = $(val),
							val = element.val(),
							pos = element.attr('qtip-position');

					if(val.length === 0){
						element.addClass('has-error');
						_createQtip(element, pos);
						valid = false;
					}
				});

				return valid;
	};

	return {
		init : init,
		validateForm: validateForm
	};

})();

validation.init();