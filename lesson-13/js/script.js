/*jshint esversion: 6 */

// Табы

window.addEventListener( 'DOMContentLoaded',  function () {
	let tab = document.getElementsByClassName('info-header-tab'),
		tabContent = document.getElementsByClassName('info-tabcontent'),
		info = document.getElementsByClassName('info-header')[0],
		inputs = document.querySelectorAll('.counter input');

	for ( let i = 0; i < inputs.length; i++ ) {
		inputs[i].value = '';
		// Очищаем поля ввода каклькулятора
	}

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
	let deadline = '2018-04-15';

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
		});
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
		}/*Параметр draw*/, /*Параметр duration*/1200/*Параметр duration*/);
	});


	// Создаем модальное окно

	let more = document.querySelector('.more'),
		moreBtns = document.querySelectorAll('.description-btn'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close'),
		statusMessage = document.createElement('div');

	more.addEventListener('click', function() {
		this.classList.add('bounceInLeft');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});
	moreBtns[0].addEventListener('click', function() {
		this.classList.add('bounceInLeft');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});
	moreBtns[1].addEventListener('click', function() {
		this.classList.add('bounceInLeft');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});
	moreBtns[2].addEventListener('click', function() {
		this.classList.add('bounceInLeft');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});
	moreBtns[3].addEventListener('click', function() {
		this.classList.add('bounceInLeft');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});
	close.addEventListener('click', function() {
		overlay.style.display = 'none';
		more.classList.remove('bounceInLeft');
		document.body.style.overflow = '';
		statusMessage.classList.add( 'hide' );
	});

	// Form

 	//let message = new Object();


	let modalWindow = document.getElementsByClassName('popup')[0],
		form = modalWindow.getElementsByTagName('form')[0],
		input = form.getElementsByTagName('input'),
		contactForm = document.getElementById('form'),
		inputContactForm = contactForm.getElementsByTagName('input');
	
	statusMessage.classList.add( 'status' );


	modalWindow.addEventListener('submit', function(event) {
		event.preventDefault();
		form.appendChild( statusMessage );
		statusMessage.classList.remove( 'hide' );

		// AJAX

		let request = new XMLHttpRequest();
		request.open("POST", 'server.php');

		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		let formData = new FormData(form);

		request.send(formData);

		request.onreadystatechange = function () {
			if ( request.readyState < 4 ) {
				//statusMessage.innerHTML = message.loading;
				statusMessage.style.backgroundImage = 'url(https://image.ibb.co/jzR3Rc/ajax_loader.gif)';
				statusMessage.style.width = '550px';
			} else if ( request.readyState === 4 ) {
				if ( request.status == 200 && request.status < 300 ) {
					statusMessage.style.backgroundImage = 'url(https://image.ibb.co/jKVmex/success.png)';
					statusMessage.style.width = '50px';
					// Добавляем контент на страницу
				} else {
					statusMessage.style.backgroundImage = 'url(https://image.ibb.co/iH0mex/failure.png)';
					statusMessage.style.width = '50px';
				}
			}
		};
		for ( let i = 0; i < input.length; i++ ) {
			input[i].value = '';
			// Очищаем поля ввода
		}
	});


	contactForm.addEventListener('submit', function(event) {
		event.preventDefault();
		contactForm.appendChild( statusMessage );
		statusMessage.style.display = 'block';

		// AJAX

		let request = new XMLHttpRequest();
		request.open("POST", 'server.php');

		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		let formData = new FormData(form);

		request.send(formData);

		request.onreadystatechange = function () {
			if ( request.readyState < 4 ) {
				statusMessage.style.backgroundImage = 'url(https://image.ibb.co/jzR3Rc/ajax_loader.gif)';
				statusMessage.style.width = '550px';
			} else if ( request.readyState === 4 ) {
				if ( request.status == 200 && request.status < 300 ) {
					statusMessage.style.backgroundImage = 'url(https://image.ibb.co/jKVmex/success.png)';
					statusMessage.style.width = '50px';
					// Добавляем контент на страницу
				} else {
					statusMessage.style.backgroundImage = 'url(https://image.ibb.co/iH0mex/failure.png)';
					statusMessage.style.width = '50px';
				}
			}
		};
		for ( let i = 0; i < inputContactForm.length; i++ ) {
			inputContactForm[i].value = '';
			// Очищаем поля ввода
		}
	});

	// Slider

	let slideIndex = 1,
		slides = document.getElementsByClassName('slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.getElementsByClassName('dot');

	showSlides( slideIndex );

	function showSlides ( n ) {
		
		if ( n > slides.length ) {
			slideIndex = 1;
		}
		if ( n < 1 ) {
			slideIndex = slides.length;
		}
		for ( let i = 0; i < slides.length; i++ ) {
			slides[i].style.display = 'none';
		}
		for ( let i = 0; i < dots.length; i++ ) {
			dots[i].classList.remove( 'dot-active' );
		}

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add( 'dot-active' );
	}

	function plussSlides ( n ) {
		showSlides( slideIndex += n );
	}

	function currentSlide ( n ) {
		showSlides( slideIndex = n );	
	}

	prev.addEventListener ('click', function () {
		plussSlides(-1);
	});
	next.addEventListener( 'click', function () {
		plussSlides(1);
	});

	dotsWrap.addEventListener( 'click', function ( event ) {
		for ( let i = 0; i < dots.length + 1; i++ ) {
			if ( event.target.classList.contains( 'dot' ) && event.target == dots[i-1] ) {
				currentSlide(i);
			}
		}
	});


	// Калькулятор

	let peopleField = document.getElementsByClassName( 'counter-block-input' )[0],
		dayField = document.getElementsByClassName( 'counter-block-input' )[1],
		base =  document.getElementById( 'select' ),
		total = document.getElementById( 'total' );		
		total.innerHTML = 0;

	function calculateTotal ( persons, days, base ) {
		if ( peopleField.value > 0 && dayField.value > 1 ) {
			console.log(typeof(peopleField.value, dayField.value));
			if ( peopleField.value.charAt(0) == 0 || dayField.value.charAt(0) == 0 ) {
				total.innerHTML = 0;
			} else {
				if ( base == 1 ) {
					total.innerHTML = Number((( peopleField.value * dayField.value ) * 1 ) * 3000 );
					total.classList.toggle('bounceInRight');
				} else if ( base == 1.5 ) {
					total.innerHTML = Number((( peopleField.value * dayField.value ) * 1.5 ) * 3000 );
					total.classList.toggle('bounceInRight');
				} else if ( base == 1.8 ) {
					total.innerHTML = Number((( peopleField.value * dayField.value ) * 1.8 ) * 3000 );
					total.classList.toggle('bounceInRight');
				}
			}
		} else {
			total.innerHTML = 0;
		}	
	}


	peopleField.addEventListener( 'change', function () {
		calculateTotal( peopleField.value, dayField.value, base.value );
	});
	dayField.addEventListener( 'change', function () {
		calculateTotal( peopleField.value, dayField.value, base.value );
	});
	base.addEventListener( 'change', function () {
		calculateTotal( peopleField.value, dayField.value, base.value );
	});

});