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