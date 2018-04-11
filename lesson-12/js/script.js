// Функция проверки загрузки страницы
jQuery( document ).ready( function( $ ) {
	// Обращаемся к заданым элементам через групповой селектор
	// Присваиваем им событие 'click'
	$( '.main_btna, .main_btn, nav ul li:eq(1) ' ).on( 'click', function () {
		// Плавное появление модального окна
		$(' .modal ').animate({
			opacity: 'toggle',
			height: 'toggle',
			width: 'toggle'
		}, 1500);
		// Плавное появление подлложки
		$( '.overlay' ).animate({
			opacity: 'toggle',
			backgroundImage: 'linear-gradient(45deg, #ed1c24, #fcee21)'
		}, 1500);
	});
	// Обращаемся к крестику и присваиваем событие 'click'
	$( '.close' ).on( 'click', function () {
		// Плавное исчезновение модального окна
		$(' .modal ').animate({
			opacity: 'toggle',
			height: 'toggle',
			width: 'toggle'
		}, 1500);
		// Плавное исчезновение подлложки
		$( '.overlay' ).animate({
			opacity: 'toggle',
			backgroundImage: 'linear-gradient(45deg, #ed1c24, #fcee21)'
		}, 1500);
	});

// Отправка данных с формы на сервер
	$( function() {
		$(' .contactform_select' ).submit( function( event ) {
    		// Отмена стандартного события отправки данных
    		event.preventDefault();
    		// Получаем форму
    		let form = $( this );

    		$.ajax({
    			// Указываем, как отправлять данные формы
    			type: form.attr( 'method' ),
    			// Данные формы отправляются на страницу, указанную в атрибуте действия
    			url: form.attr( 'action' ),
    			// Добавляет данные формы внутри тела HTTP-запроса
    			data: form.serialize()
    			// Если отправка успешная
    		}).done( function( data ) {
      			alert( 'Отправка данных прошла успешно!' );
      			// Если отправка неудачная 
  			}).fail( function( data ) {
      			alert( 'Что-то пошло не так... Попробуйте снова через некоторое время.' );
  			});
		});
	});

});