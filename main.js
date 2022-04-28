var checked = false; //Security
var temp = randomTemp();
var tempSet = temp;
localStorage.setItem("temp", JSON.stringify(temp));
localStorage.setItem("tempSet", JSON.stringify(tempSet));

window.onload = () => {
	checked = JSON.parse(localStorage.getItem("checkedSecurity"));

	if (window.location.href.match("index.html") != null) {
		if (checked) {
			console.log(checked);
			setTemp();
			let threat = chooseThreat();
			executeAllert(threat);
		}
	} else if (window.location.href.match("seguranca.html") != null) {
		document.getElementById("c1").checked = checked;
	}
};
if (window.location.href.match("rega.html") != null) {
	// document.querySelector("#btn-set").addEventListener("click", timeSet);
}

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
	return Math.floor(Math.random() * 10) + 18;
}

function executeAllert(threat) {
	element = document.querySelector("#security-alert");
	elNav = document.querySelector(".navbar-ul");
	elementText = document.getElementById("security-alert-text");
	original_color = element.style.backgroundColor;

	function allert(active) {
		if (active) {
			element.style.backgroundColor = "red";
			elementText.innerHTML = "AMEAÇA!";
		} else {
			element.style.backgroundColor = original_color;
			elementText.innerHTML = "Sem ameaças.";
		}
	}

	setInterval(function () {
		allert(true);
		setTimeout(function () {
			allert(false);
		}, 3000);
	}, 9000);
}

// Security

document.addEventListener("click", value);

function value() {
	var check = document.querySelector("#c1");
	checked = check.checked;
	localStorage.setItem("checkedSecurity", JSON.stringify(checked));
}

const Evideo = document.querySelector("#video");
const Eplay = document.querySelector("#play");

Eplay.addEventListener("click", () => {
	const isPaused = Evideo.paused;
	Evideo[isPaused ? "play" : "pause"]();
	Evideo.classList.toggle("u-none", !isPaused);
});

var divisoes = ["cozinha", "sala", "varanda", "quarto", "casa de banho"];
function chooseThreat() {
	var threat =
		"Intruso no/a " + divisoes[Math.floor(Math.random() * 10)] + ".";
	return threat;
}
