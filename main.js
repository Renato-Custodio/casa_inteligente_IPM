var divisoes = ["cozinha", "sala", "varanda", "quarto"];
var checked = false;
var temp;
var tempSet;
var threat=null;
var list;
var num = 0; 
var regas; // lista de regas
//estas cenas da tem eu ja ponho a funcionar bem (correia)

window.onload = () => {
	checked = JSON.parse(localStorage.getItem("checkedSecurity"));

	if (window.location.href.match("index.html") != null) {
		if(!(JSON.parse(localStorage.getItem("list")) == null)){
			document.querySelector("#security-alert ul").innerHTML = JSON.parse(localStorage.getItem("list"));
		}
		
		statusSec(checked);
		temp = randomTemp();
		tempSet = temp;
		setTemp();
		if (checked) {

			executeAllert();
		}
	} else if (window.location.href.match("seguranca.html") != null) {
		document.getElementById("c1").checked = checked;
		document.addEventListener("click", value);
	}else if (window.location.href.match("rega.html") != null) {
		
	}
};




//rega



function timeSet(bool) {
	let pick1 = document.getElementById("time1");
	let pick2 = document.getElementById("time2");
	if (!pick1.value || !pick2.value) {

		if (pick1 <= pick2) {
			let div = document.getElementById("time-interval-picker");
			let error = document.createElement("span");
			error.setAttribute("id", "error");
			error.innerHTML = "Please select a valid time interval";
			div.appendChild(error);
			div.style.color = "red";

			setTimeout(function () {	
				document.getElementById("error").remove();
			}, 2000);

		}
	} else {
		let time = document.createElement("span");
		time.innerHTML = "Time interval set";
		time.id = "time";
		let div = document.getElementById("time-interval-picker");
		div.style.color = "white";
		div.appendChild(time);

		//real shit

		console.log(pick1.value);
		console.log(pick2.value);

		var li = document.createElement("li");
		li.appendChild(document.createTextNode(pick1.value));
		li.appendChild(document.createTextNode(pick2.value));
		
		var divisao = document.querySelector("#divisoes").value;
		console.log(divisao);
		console.log(divisao=="Varanda");
		if(divisao == "Varanda") {
			localStorage.setItem("timeVaranda", JSON.stringify());
		}
		

		setTimeout(function () {	
			document.getElementById("time").remove();
		}, 2000);
	}

}



//cozinha




function setTemp() {
	var element = document.querySelector("#temp");
	element.textContent = temp + "ºC";

	element = document.querySelector("#temp_cozinha");
	element.textContent = tempSet + "ºC";

	localStorage.setItem("temp", JSON.stringify(temp));
	localStorage.setItem("tempSet", JSON.stringify(tempSet));
}

function randomTemp() {
	//generate a random temperature
	var temp = Math.floor(Math.random() * 10) + 18;
	return temp;
}

function ajustTemp() {
	//slowly in a intervall of a minute change temp to tempSet
}

function increase() {
	var element = document.querySelector("#temp");
	tempSet++;
	element.textContent = tempSet + "ºC";
	console.log(tempSet + "ºC");
}

function decrease() {
	var element = document.querySelector("#temp");
	tempSet--;
	element.textContent = tempSet + "ºC";
	console.log(tempSet + "ºC");
}

function randomTemp() {
	//generate a random temperature
	return Math.floor(Math.random() * 10) + 18;
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
			//pop up
			var label = document.createElement("label");
			label.appendChild(document.createTextNode("Alerta Intruso"));
			label.id = "popUp";
			document.querySelector("#top").appendChild(label);

		} else {
			num = JSON.parse(localStorage.getItem("num"));
			num++;
			//criar lista
			var li = document.createElement("li");
			//set up list
			var txt = document.createTextNode(threat);
			li.appendChild(txt);
			var id = generateId();
			li.innerHTML += '<button class="segura" id="'+id+'" onclick=removeItemList("'+id+'") type="button">X</button>';
			list = document.querySelector("#security-alert ul").getElementsByTagName("li");
			if(list != null && list[0].innerText=="Sem ameaças."){
				elementText.innerHTML="";
			}
			elementText.appendChild(li);
			localStorage.setItem("list", JSON.stringify(elementText.innerHTML));
			localStorage.setItem("num",JSON.stringify(num));
			document.querySelector("#top label").remove();
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
	checked = check.checked;
	localStorage.setItem("checkedSecurity", JSON.stringify(checked));
}

var Evideo = document.querySelector("#video");
var Eplay = document.querySelector("#play");

// Eplay.addEventListener("click", () => {
// 	const isPaused = Evideo.paused;
// 	Evideo[isPaused ? "play" : "pause"]();
// 	Evideo.classList.toggle("u-none", !isPaused);
// });

function chooseThreat() {
	var message = null;
	do {

		message = "Intruso no/a " + divisoes[Math.floor(Math.random() * 100) % divisoes.length] + ".";

	}while(message === JSON.parse(localStorage.getItem("threat")));

	localStorage.setItem("threat", JSON.stringify(threat));

	return message;
}
