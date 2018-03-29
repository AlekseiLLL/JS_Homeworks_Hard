/*jshint esversion: 6 */

// Матрица

// Функция которая будет спрашивать у пользователя сколько массивов включить во 
// внутрь arr + заполнение рандомными числами элементов массива

function matrix() {
	let amount = prompt( "Сколько массивов включить во внутрь arr?", '' );

	// Проверяем правильность введенных данных

	while (isNaN(amount) || amount === "" || amount === null) {
		amount = prompt( "Сколько массивов включить во внутрь arr?", '' );
	}

	// Создаем динамически количество массивов, которое задал пользователь

  	let mass = [];
  	for( let i = 0; i < amount; i++ ) {

  		// Решил делать квадратные матрицы

 		mass[i] = [];
    	for( let  j = 0; j < amount; j++ ) {

    		// Расчитываем рандом

    		let rand = 1 + Math.floor(Math.random() * (100 + 1 - 1));

    		// Записываем рандомное число в элемент матрицы

      		mass[i][j] = rand; 
		}
	}

	// Возвращаем mass

  	return mass;
}

let arr = matrix();

console.log(arr);


// Рассчитываем сумму элементов матрицы  

function arraySum(arr) {
  	let sum = 0;

  	// Перечисляем все элементы

  	arr.forEach(function(check) {
    	
    	// Проверяем тип элемента

    	if (typeof check == 'object') {

      	// Считаем сумму всех элементов массива

      	sum += arraySum(check);
  		} else {
      		sum += check;
  		}
  	});

  	// Возвращаем сумму

  	return sum;
}

console.log(arraySum(arr));