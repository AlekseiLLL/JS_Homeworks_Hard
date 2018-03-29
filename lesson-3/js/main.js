/*jshint esversion: 6 */

// Усложненное задание

// Переменные 

let str = "урок-3-был слишком легким";
let symbolReplace = "oo";
let arr = [20, 33, 1, "Человек", 2, 3];
let temp;
let sum = 0;
let arr2 = [];

// Пересоздаем строку с заглавным первым символом

if (str) {
	str = str[0].toUpperCase() + str.slice(1);
	console.log( str );
} else {
	console.log( 'Строка пуста!!!' );
}

// Заменяем все “-” на пробелы используя регулярное выражение поиска всех “-”
// и с помощью флагов ig  i - чтобы не различать строчные и заглавные буквы
// g - глобальный поиск. Порядок указания флагов не имеет значения

str = str.replace(/-/ig, ' ');

console.log( str );

// Пересоздаем строку уже без слова "легко"

str = str.substring(0, 19);

console.log( str );

// Пересоздаем строку с двумя последними буквами "оо"

str = str.substring(0, 16) + symbolReplace;

console.log( str );

// Считаем суму кубов элементов

for (let i = 0; i < 6; i++) {
	if ( !isNaN( arr[i] ) ) { // Проверяем, чисельный ли элемент
		temp = Math.pow(arr[i], 3); // Закидываем куб элемента в переменную temp
		arr2[i] = temp; // Заполняем массив поэлементно 
		sum += arr2[i]; // Записываем сумму кубов с массива arr2
	} else {
		arr2[i] = null; // Заполняем массив null, чтобы не было empty item
	}
}

// Вывод

console.log( arr2 );
console.log( sum );

// Выводим в консоль квадратный корень из суммы кубов его элементов

console.log( Math.sqrt(sum) );