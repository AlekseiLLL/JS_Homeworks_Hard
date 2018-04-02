/*jshint esversion: 6 */

//  Переменные

let budget,
	shopName,
	price = 1000;

// Получаем элементы страницы

let openBtn = document.getElementById( 'open-btn' ),
	// Левое меню
	name = document.getElementsByClassName( 'name' )[0],
	nameValue = document.getElementsByClassName( 'name-value' )[0],
	budgetElement = document.getElementsByClassName( 'budget' )[0],
	budgetElementValue = document.getElementsByClassName( 'budget-value' )[0],
	goods = document.getElementsByClassName( 'goods' )[0],
	goodsValue = document.getElementsByClassName( 'goods-value' )[0],
	items = document.getElementsByClassName( 'items' )[0],
	itemsValue = document.getElementsByClassName('items-value')[0],
	employers = document.getElementsByClassName('employers')[0],
	employersValue = document.getElementsByClassName('employers-value')[0],
	discount = document.getElementsByClassName('discount')[0],
	discountValue = document.getElementsByClassName('discount-value')[0],
	isOpen = document.getElementsByClassName('isopen')[0],
	isOpenValue = document.getElementsByClassName('isopen-value')[0],
	// Товары
	chooseGoods = document.querySelectorAll( '.goods-item' ),
	// Кнопки 
	goodsButton = document.getElementsByTagName('button')[1],
	countBudgetButton = document.getElementsByTagName('button')[2],
	hireEmployerButton = document.getElementsByTagName('button')[3],
	// Поля
	chooseItem = document.querySelector( '.choose-item' ),
	timeValue = document.querySelector( '.time-value' ),
	countBudgetValue = document.querySelector( '.count-budget-value' ),
	// querySelectorAll
	employersName = document.querySelectorAll( '.main-functions .hire-employers-item' );


// Функции

// Функция для запрашивания у пользователя Бюджета (budget) 
// и Названия магазина (shopName) и проверка правильности ввода
// Обработчики событий

openBtn.addEventListener( 'click', () => {
	budget = prompt( "Ваш бюджет?", '' );
	
	while (isNaN(budget) || budget === "" || budget === null) {
		budget = prompt( "Ваш бюджет?", '') ;
	} 
	budgetElementValue.textContent = budget;

	nameValue.textContent = prompt( "Название вашего магазина?", '' ).toUpperCase();
});

// Функция дисконтной системы 

openBtn.addEventListener( 'click', () => {
	let isDiscount = confirm( 'Вы желаете подключить дисконтную систему?' );
	if ( isDiscount ) {
		price *= 0.9;
		discountValue.textContent = 'Скидка: 10% ';
		discountValue.style.backgroundColor = 'yellowgreen';
	} else {
		discountValue.textContent = '';
		discountValue.style.backgroundColor = 'red';
	}
});

// Функция записи в массив Типа товаров (shopGoods) и проверка правильности ввода

goodsButton.addEventListener( 'click', () => {


	for (let i = 0; i < chooseGoods.length; i++) {
		let a = chooseGoods[i].value;

		if (( typeof(a)) === 'string' && ( typeof(a)) !== null && a.length < 50 ) {
			console.log('Все верно! ');
			mainList.shopGoods[i] = a;
			goodsValue.textContent = mainList.shopGoods;
		} else {
			i--;
		}
	}
});

// Функция выбора товаров

chooseItem.addEventListener( 'change', () => {
	let items = chooseItem.value;
	// Проверка на правильность ввода для items
	if (isNaN(items) || items !== '' ) {
		// Записываем элементы строки в массив через ","
		mainList.shopItems = items.split( "," );
		// Сортируем массив по алфавиту
		mainList.shopItems.sort();
		
		itemsValue.textContent = mainList.shopItems;

	}
});

// Функция проверки времени работы магазина (time), время передаем при  
// вызове функции

timeValue.addEventListener( 'change', () => {
	let time = timeValue.value;
	if (time < 0) {
		console.log('Такого просто не может быть!');
		mainList.open = false;
		} else if (time >= 8 && time < 20) {
			console.log('Время работать!');
			mainList.open = true;
			} else if (time < 24) {
				console.log('Уже слишком поздно!');
				mainList.open = false;
				} else {
					console.log('В сутках только 24 часа!');
					mainList.open = false;
				}

	if ( mainList.open ) {
		isOpenValue.style.backgroundColor = 'yellowgreen';
	} else {
		isOpenValue.style.backgroundColor = 'red';
	}
});

// Функция расчета дневного бюджета (mainList.budget)

countBudgetButton.addEventListener( 'click', () => {
	countBudgetValue.value = budget / 30;
});

// Функция найма сотрудников

hireEmployerButton.addEventListener( 'click', () => {
	for (let i = 0; i < employersName.length; i++) {

		let employeeName = employersName[i].value;

		mainList.employers[i] = employeeName;

		console.log( 'Сотрудник добавлен! ' );

		employersValue.textContent += mainList.employers[i] + ', ';
	}
});

// Объект mainList 

let mainList = {

	// Свойства объекта
	budget: budget,
	shopName: shopName,
	open: false,
	discount : true,
	shopGoods: [],
	shopItems: [],
	employers: {
		1: "Имя" 
	}
};

// Вывод

//mainList.chooseShopItems();

console.log( mainList );

//mainList.youCanBuy();

//mainList.ourShopIncludes();