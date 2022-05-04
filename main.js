var divisoes = ["cozinha", "sala", "varanda", "quarto"];
var checked = false; //Security

var temp;
var tempSet;
var threat=null;
var list;
var num = 0; 


window.onload = () => {
	checked = JSON.parse(localStorage.getItem("checkedSecurity"));

	loadTemps();
	setInterval(ajustTemp, 2000);

	if (window.location.href.match("index.html") != null) {

		if(!(JSON.parse(localStorage.getItem("list")) == null)){
			document.querySelector("#security-alert ul").innerHTML = JSON.parse(localStorage.getItem("list"));
		}
		
		statusSec(checked);

		if (checked) {

			executeAllert();
		}
	} else if (window.location.href.match("seguranca.html") != null) {
		document.getElementById("c1").checked = checked;
		document.addEventListener("click", value);
	}else if (window.location.href.match("rega.html") != null) {
		// document.querySelector("#btn-set").addEventListener("click", timeSet);
	}
};

//rega
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


function loadTemps() {
	//only if temps not in local storage create news and save ttemps in local storage
	if (localStorage.getItem("temp") == null) {
		temp = Math.floor(Math.random() * 10) + 18;
		tempSet = temp;
		localStorage.setItem("temp", JSON.stringify(temp));
		localStorage.setItem("tempSet", JSON.stringify(tempSet));
	} else {
		temp = JSON.parse(localStorage.getItem("temp"));
		tempSet = JSON.parse(localStorage.getItem("tempSet"));
	}

	updateTemp();
}

function updateTemp() {
	var element = document.querySelector("#temp_cozinha");

	element.textContent = temp + "ºC";

	element = document.querySelector("#temp");
	element.textContent = tempSet + "ºC";

	localStorage.setItem("temp", JSON.stringify(temp));
	localStorage.setItem("tempSet", JSON.stringify(tempSet));
}

function ajustTemp() {
	//funcion that runs every second and checks if the temp is correct
	if (temp != tempSet) {
		if (temp > tempSet) {
			temp--;
		}
		if (temp < tempSet) {
			temp++;
		}
		updateTemp();
	}
}

function increase() {
	var element = document.querySelector("#temp");
	tempSet++;
	element.textContent = tempSet + "ºC";
	updateTemp();
}

function decrease() {
	var element = document.querySelector("#temp");
	tempSet--;
	element.textContent = tempSet + "ºC";
	updateTemp();
}

//security

function reset() {
	var elem = document.querySelector("#security-alert ul");
	elem.innerHTML="";
	localStorage.removeItem("list");
	var li = document.createElement("li");
	li.appendChild(document.createTextNode("Sem ameaças."));
	elem.appendChild(li);
	localStorage.setItem("list", JSON.stringify(elem.innerHTML));
	num = 0;
	localStorage.setItem("num",JSON.stringify(num));
}

//index sec status
function statusSec(check){
	var txt;
	if(check){
		txt = document.createTextNode("Enabled");
	}else{
		txt = document.createTextNode("Disabled");
	}
	var status = document.querySelector("#status");
	status.appendChild(txt);
}

function executeAllert() {
	element = document.querySelector("#security-alert");
	elNav = document.querySelector(".navbar-ul");
	
	original_color = element.style.backgroundColor;

	function allert(active) {
		threat = chooseThreat();
		elementText = document.querySelector("#security-alert ul");
		if (active) {
			element.style.backgroundColor = "red";
			//pop up
		} else {
			element.style.backgroundColor = original_color
			//criar elementos da lista
			//criar botao
			/* var button = document.createElement("button");
			button.innerHTML= "X"; */
			num = JSON.parse(localStorage.getItem("num"));

			num++;

			var txt = document.createTextNode(threat);
			//criar lista
			var li = document.createElement("li");
			li.appendChild(txt);
			var id = generateId();
			li.innerHTML += '<button class="segura" id="'+id+'" onclick=removeItemList("'+id+'") type="button">X</button>';
			//todo
			list = document.querySelector("#security-alert ul").getElementsByTagName("li");
			if(list != null && list[0].innerText=="Sem ameaças."){
				document.querySelector("#security-alert ul").innerHTML="";
			}
			elementText.appendChild(li);
			localStorage.setItem("list", JSON.stringify(elementText.innerHTML));
			localStorage.setItem("num",JSON.stringify(num));
		}
	}

	

	setInterval(function () {
		allert(true);
		setTimeout(function () {
			allert(false);
		}, 3000);
	}, 9000);
}


function removeItemList(id) {
	document.querySelector("#security-alert ul").innerHTML = JSON.parse(localStorage.getItem("list"));
	var ul = document.querySelector("#security-alert ul");
	var lis = ul.getElementsByTagName("li");
	for(var i = 0; i < lis.length; i++) {
		var wantedId = lis[i].querySelector("[type=button]").id;
		if(id == wantedId) {
			lis[i].remove();
			if(lis.length==0){
				var li = document.createElement("li");
				li.appendChild(document.createTextNode("Sem ameaças."));
				ul.appendChild(li);
			}
			localStorage.setItem("list",JSON.stringify(ul.innerHTML));
		}
	}

	
} 

function generateId() {
	return "button"+JSON.parse(localStorage.getItem("num"));
}

function value() {
	var check = document.querySelector("#c1");
	//checked = check.checked;  //FIXME: tive que comentar isto porque estava a dar erro quando tentava aumentar a temp na cozinh (???)
	localStorage.setItem("checkedSecurity", JSON.stringify(checked));
}

var Evideo = document.querySelector("#video");
var Eplay = document.querySelector("#play");

if (Evideo && Eplay) {
	Eplay.addEventListener("click", () => {
		const isPaused = Evideo.paused;
		Evideo[isPaused ? "play" : "pause"]();
		Evideo.classList.toggle("u-none", !isPaused);
	});
}

function chooseThreat() {
	var message = null;
	do {

		message = "Intruso no/a " + divisoes[Math.floor(Math.random() * 100) % divisoes.length] + ".";

	}while(message === JSON.parse(localStorage.getItem("threat")));

	localStorage.setItem("threat", JSON.stringify(threat));

	return message;
}
