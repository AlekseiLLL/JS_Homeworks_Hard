//Homework 1 hard

//Переменная num

var num = 33721;
var x = 1;
var z = 1;

//Записываем в переменную x остачу от числа и производим эти числа

for (var i = 0; i < 5; i++) {
	x = num % 10;
	num /= 10;
	z *= parseInt(x); 
}

//Возведение в степень

var x = Math.pow(z, 3);

//Вывод в консоль

console.log('Произведение: ' + z);
console.log('Возведение в степень: ' + x);