// RequestAnimationFrame 
// Нужен для группировки всех перерисовок в одну и для запуска их всех вместе.

function animate( options ) {
	// Время, прошедшее с начала загрузки страницы
	let start = performance.now();
	// Получем параметр 
	requestAnimationFrame( function animate( time ) {
    	// Общее время, которое должна длиться анимация, от 0 до 1
    	let timeFraction = ( time - start ) / options.duration;
    	if ( timeFraction > 1 ) timeFraction = 1;
    	// Получаем текущее состояние анимации
    	let progress = options.timing(timeFraction)
    	// Рисуем
    	options.draw( progress );
    	if ( timeFraction < 1 ) {
    		requestAnimationFrame( animate );
    	}
	});
}
