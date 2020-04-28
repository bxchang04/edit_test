// For Calendar, Date picker and Time picker
var today = new Date();
var currentHour = today.getHours();
var currentMinutes = today.getMinutes();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var startYearRange = currentYear - 3;
var monthsLongName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthsShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var daysShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


// Calendar
// https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d
var monthAndYear = document.getElementsByClassName("calendar__month-year");
var calendarBody = document.getElementsByClassName("calendar__body");


for (var i = 0; i < calendarBody.length; i++) {
	showCalendar(currentMonth, currentYear, calendarBody.item(i), monthAndYear.item(i));
}


function showCalendar(month, year, calendarBody, monthYear) {
	let firstDay = (new Date(year, month)).getDay();

	// clearing all previous cells
	calendarBody.innerHTML = "";

	// filing data about month and in the page via DOM.
	monthYear.innerHTML = monthsLongName[month] + " " + year;

	// creating all cells
	let date = 1;
	let rows = 5;

	if (firstDay === 0 && daysInMonth(month, year) <= 29 && month === 1) {
		rows = 4;
	}
	else if (firstDay > 5 && month !== 1) {
		rows = 6;
	}

	for (let i = 0; i < rows; i++) {
		// creates a table row
		let row = document.createElement("tr");

		//creating individual cells, filing them up with data.
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) {
				cell = document.createElement("td");
				cellText = document.createTextNode("");
				cell.appendChild(cellText);
				row.appendChild(cell);
			}

			//if dates have not all been populated yet, populate each td with a date incrementally
			else if (date <= daysInMonth(month, year)) {
				cell = document.createElement("td");
				cellText = document.createTextNode(date);
				if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
					span = document.createElement("span");
					span.classList.add("active");
					span.appendChild(cellText);
					cell.appendChild(span);
				}

				else{
					cell.appendChild(cellText);
				}

				row.appendChild(cell);
				date++;
			}

			//otherwise, populate calendar with blank 'td's' until the end of the last row to ensure consistent grid formatting
			else {
				if (j < 7) {
					cell = document.createElement("td");
					cellText = document.createTextNode("");
					cell.appendChild(cellText);
					row.appendChild(cell);
				}
			}
		}
		calendarBody.appendChild(row); // appending each row into calendar body.
	}
}



// Date Picker
// https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d
var monthAndYearDatePicker = document.getElementsByClassName("date-picker__month-year-label");
var datePickerBody = document.getElementsByClassName("date-picker__body");
var datePickerYear = document.getElementsByClassName("date-picker__year");
var datePickerToday = document.getElementsByClassName("date-picker__today");
var datePickerYearList = document.getElementsByClassName("date-picker__year-range");


for (var i = 0; i < datePickerBody.length; i++) {
	showDatePicker(currentMonth, currentYear, datePickerBody.item(i), monthAndYearDatePicker.item(i), datePickerYear.item(i), datePickerToday.item(i), datePickerYearList.item(i));
}


function showDatePicker(month, year, datePickerBody, monthYear, labelYear, labelToday, datePickerYearList) {
	let firstDay = (new Date(year, month)).getDay();

	// clearing all previous cells
	datePickerBody.innerHTML = "";

	// filing data about month and in the page via DOM.
	monthYear.innerHTML = monthsLongName[month] + " " + year;
	labelYear.innerHTML = year;
	labelToday.innerHTML = daysShortName[today.getDay()] + ", <br>" + monthsShortName[month] + " " + today.getDate();

	// creating all cells
	let date = 1;
	for (let i = 0; i < 6; i++) {
		// creates a table row
		let row = document.createElement("tr");

		//creating individual cells, filing them up with data.
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) {
				cell = document.createElement("td");
				cellText = document.createTextNode("");
				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			else if (date > daysInMonth(month, year)) {
				break;
			}

			else {
				cell = document.createElement("td");
				cellText = document.createTextNode(date);
				if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
					span = document.createElement("span");
					span.classList.add("active");
					span.appendChild(cellText);
					cell.appendChild(span);
				}

				else{
					cell.appendChild(cellText);
				}

				row.appendChild(cell);
				date++;
			}
		}
		datePickerBody.appendChild(row); // appending each row into calendar body.
	}


	for (let i = startYearRange; i < startYearRange + 7; i++) {
		li = document.createElement("li");
		liText = document.innerHTML = i;
		li.innerHTML = liText;
		datePickerYearList.appendChild(li);
	}
}


// check how many days in a month
function daysInMonth(iMonth, iYear) {
	return 32 - new Date(iYear, iMonth, 32).getDate();
}



// Time Picker
var timePickerTime = document.getElementsByClassName("time-picker__time");
var timePickerAm = document.getElementsByClassName("time-picker__am");
var timePickerPm = document.getElementsByClassName("time-picker__pm");
var timePickerDial = document.getElementsByClassName("time-picker__dial");


for (var i = 0; i < timePickerTime.length; i++) {
	showTimePicker(currentHour, currentMinutes, timePickerTime.item(i), timePickerAm.item(i), timePickerPm.item(i), timePickerDial.item(i));
}




function showTimePicker(hours, minutes, timeElement, timeAmElement, timePmElement, timeDialElement) {
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	timeElement.textContent = hours + ':' + minutes;
	
	if(ampm == 'pm'){
		timeAmElement.classList.add("o-5");
	}
	else{
		timePmElement.classList.add("o-5");
	}
	
	for (var i = 1; i < 13; i++) {
		div = document.createElement("div");
		span = document.createElement("span");
		span.textContent = i;
		div.classList.add("time-picker__" + i);
		
		if(i == hours){
		   div.classList.add("selected");
		}
		
		div.appendChild(span);
		timeDialElement.appendChild(div);
	}
}