/*jshint esversion: 6 */

// Табы

window.addEventListener( 'DOMContentLoaded',  function () {
	 
	let tab = document.getElementsByClassName('info-header-tab'),
		tabContent = document.getElementsByClassName('info-tabcontent'),
		info = document.getElementsByClassName('info-header')[0];

	function hideTabContent (a) {
		for ( let i = a; i < tabContent.length; i++ ) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);


	function showTabContent (b) {
		if ( tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function(event) {
		let target = event.target;
		if ( target.className == 'info-header-tab' ) {
			for (let i = 0; i < tab.length; i++ ) {
				if ( target == tab[i] ) {
					showTabContent(i);
					break;
				}
			}
		}
	});

	// Таймер

	// Часовой пояс по UTC
	let deadline = '2018-04-06';

	function getTimeRemaining (endtime) {
		let t = Date.parse( endtime ) - Date.parse( new Date() ),
		seconds = Math.floor (( t / 1000) % 60 ),
		minutes = Math.floor (( t / 1000 / 60) % 60 ),
		hours = Math.floor (( t / ( 1000 * 60 * 60 )));

		// Проверка на актуальность даты

		if ( t < 0 ) {
			return {
				'total' : 0,
				'hours' : '00',
				'minutes' : '00',
				'seconds' : '00'
			};
		}
		return {
			'total' : t,
			'hours' : hours,
			'minutes' : minutes,
			'seconds' : seconds
		};
	}

	// Запускаем часы (Установка таймера) 

	function setClock ( id, endtime ) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			// Ставим интервал для функции 1 секунду
			timeInterval = setInterval( updateClock, 1000 );

		// Обновить часы

		function updateClock () {
			let t = getTimeRemaining( endtime );
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds;

			console.log(t);

			if ( t.total <= 0 ) {
				clearInterval( timeInterval );
			}
		}
		// Вызываем функцию обновления часов
		updateClock();
		
	}
	setClock( 'timer', deadline );


	// Плавная прокрутка

	// Передаем в функцию параметры анимации и времени выполнения анимации 
	function animate( draw, duration ) {
		// Получаем текущее время
		let start = performance.now();
		// Передаем анимацию браузеру
		requestAnimationFrame( function animate( time ) {
			// Вычисляем прошедшее время
			let timePassed = time - start;
			// Если прошедшее время > длительности 
			if ( timePassed > duration ) {
				// То останавливаем выполнение анимации
				timePassed = duration;
			}
			// Рисуем анимацию
			draw( timePassed );
			// Если анимация не закончилась, то вызываем requestAnimationFrame повторно 
			if ( timePassed < duration ) {
				requestAnimationFrame( animate );
			}
		})
	}


	let navigation = document.getElementsByTagName('nav')[0];

	navigation.addEventListener('click', function (event) {
		// Отменяем стандартный скрипт браузера
		event.preventDefault();
		// Описываем анимацию
		animate( /*Параметр draw*/ function( timePassed ) {
			// Элемент навигации, на который кликнули
			let target = event.target;
			// Получаем элемент, на который ссылается элемент навигации 
			let section = document.getElementById( target.getAttribute('href').slice(1) );
			// Изменяем к-во пикселей от потолка страницы согласно нужному элементу навигации
			window.scrollBy( 0, section.getBoundingClientRect().top / 20 - 3 ); 
		}/*Параметр draw*/, /*Параметр duration*/1200/*Параметр duration*/)
	})
});