window.onload = randomTemp();
window.onload = executeAllert();

document.querySelector("#btn-set").addEventListener("click", timeSet);

function timeSet() {
	let pick1 = document.getElementById("time1");
	let pick2 = document.getElementById("time2");

	if (!pick1.value || !pick2.value) {
		let date1 = pick1.valueasDate;
		let date2 = pick2.valueasDate;

		if (pick1 <= pick2) {
			let div = document.getElementById("time-interval-picker");
			let error = document.createElement("span");
			error.setAttribute("id", "error");
			error.innerHTML = "Please select a valid time interval";
			div.appendChild(error);
			div.style.color = "red";
		}
	} else {
		if (document.getElementById("error")) {
			document.getElementById("error").remove();
		}

		let time = document.createElement("span");
		time.innerHTML = "Time interval set";

		let div = document.getElementById("time-interval-picker");
		div.style.color = "white";
		div.appendChild(time);
	}
}

function increase() {
	var element = document.querySelector("#temp");
	var temp = element.textContent;
	var temp1 = parseInt(temp[0] + temp[1]);
	temp1++;
	element.textContent = temp1 + "ºC";
}

function decrease() {
	var element = document.querySelector("#temp");
	var temp = element.textContent;
	var temp1 = parseInt(temp[0] + temp[1]);
	temp1--;
	element.textContent = temp1 + "ºC";
}

function randomTemp() {
	//generate a random temperature
	var temp = Math.floor(Math.random() * 10) + 18;
	var element = document.querySelector("#temp");
	element.textContent = temp + "ºC";
}

function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("cont").style.marginLeft = "250px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("cont").style.marginLeft = "0";
}

function executeAllert() {
	setInterval(function () {
		element = document.querySelector("#security-alert");
		elementText = document.getElementById("security-alert-text");
		original_color = element.style.backgroundColor;
		element.style.backgroundColor = "red";  
		elementText.innerHTML = "AMEAÇA!";
	}, 6000);
}
