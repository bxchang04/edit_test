// Load and cache svg
const ajax = new XMLHttpRequest();
ajax.open("GET", "../img/sprite.svg", true);

ajax.onload = function(e) {
	const div = document.createElement("div");
	div.innerHTML = ajax.responseText;
	document.body.insertBefore(div, document.body.childNodes[0]);
}
ajax.send();