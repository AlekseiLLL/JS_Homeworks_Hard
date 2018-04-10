/*jshint esversion: 6 */

// Получаем элемент с id 'age'

let age = document.getElementById('age'),
	// Заносим в объект значения пользователя
	user = {
	surname: "Пупкин",
	name: "Вася",
	// Получаем значение value с элеменьа
	value: age.value, 
	show: function() {
		console.log(this === user);
		function showUser() {
			console.log(this === user);
			// Теперь this.value == user.value
			alert("Пользователь " + this.surname + " " + this.name + ", его возраст - " + this.value);
			return this.value;
		}
		// Исполняем функцию showUser, и дополнительно модифицирует контекст в соответствии параметром.
		return showUser.call(this);
	}
} ;
// Вызываем метод show объекта user
console.log(user.show());


// Создаем класс свойства

class options {
	// Передаем параметры в функцию-конструктор 
	constructor( height, width, bg, fontSize, textAlign ) {
		// this - для нового объекта
		this.height = height;
		this.width = width;
		this.bg = bg;
		this.fontSize = fontSize;
		this.textAlign = textAlign;
	}
	// Метод для создания нового div на странице
	newDiv( text, style ) {
		// Создаем новый div
		let div = document.createElement( 'div' );
		// Присваиваем ему текст с 1го аргумента 
		div.textContent = text;
		// Присваиваем ему стили с 2го аргумента
		div.style.cssText = style;

		// Возвращаем этот div
		return div;
	}
}

// Создаем новый объект через класс
const block = new options(200, 200, "red", 18, "center");
// Вызваем его метод и получаем элемент на странице
document.body.insertBefore(block.newDiv("Hello world!!!", "color: white;" +
"border-radius: 5px; height: 30px; width: 150px; background: darkcyan; " + 
"margin: 30px; padding: 30px 0; text-align: center;"), document.body.children[0]);