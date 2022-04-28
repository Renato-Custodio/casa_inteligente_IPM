var checked = true; //Security

window.onload = () => {
	// setTemp();
	checked = JSON.parse(localStorage.getItem("checkedSecurity"));
	console.log("loaded");
	//TODO get
};
window.onload = executeAllert();

window.BeforeUnloadEvent = () => {
	localStorage.setItem("checkedSecurity", checked);
};

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

function executeAllert() {
	function allert(active) {
		element = document.querySelector("#security-alert");
		elementText = document.getElementById("security-alert-text");
		original_color = element.style.backgroundColor;
		if (active) {
			element.style.backgroundColor = "red";
			elementText.innerHTML = "AMEAÇA!";
		} else {
			element.style.backgroundColor = original_color;
			elementText.innerHTML = "Sem ameaças";
		}
	}

	setInterval(function () {
		allert(true);
		setTimeout(function () {
			allert(false);
		}, 3000);
	}, 9000);
}

function setTemp() {
	const temp = randomTemp();
	var element = document.querySelector("#temp");
	element.textContent = temp + "ºC";

	element = document.querySelector("#temp_cozinha");
	element.textContent = temp + "ºC";
}

function randomTemp() {
	//generate a random temperature
	var temp = Math.floor(Math.random() * 10) + 18;
	return temp;
}

// Security

function value() {
	var check = document.querySelector("#c1");
	console.log(check.checked);
}

value();
