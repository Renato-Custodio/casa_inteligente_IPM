var divisoes = ["cozinha", "sala", "varanda", "quarto"];

var checked = false;

var temp;
var tempSet;
var threat = null;
var list;
var num = 0; 
var regas; // lista de regas
var localRega;
//estas cenas da tem eu ja ponho a funcionar bem (correia)


window.onload = () => {
	checked = JSON.parse(localStorage.getItem("checkedSecurity"));

	if (window.location.href.match("index.html") != null) {

		if(!(JSON.parse(localStorage.getItem("list")) == null)){
			document.querySelector("#security-alert ul").innerHTML = JSON.parse(localStorage.getItem("list"));
		}
		loadTemps();
		setInterval(ajustTemp, 2000);
		statusSec(checked);

		if (checked) {
			executeAllert();
		}
	} else if (window.location.href.match("seguranca.html") != null) {
		document.getElementById("c1").checked = checked;
		document.addEventListener("click", value);
	} else if (window.location.href.match("rega.html") != null) {
		var content;
		
		localRega = JSON.parse(localStorage.getItem("localRega"));
		if(localRega == null) {
			localRega = "Varanda";
			localStorage.setItem("localRega", JSON.stringify(localRega));
		}
		document.querySelector("#elem").innerHTML = localRega;

		if (JSON.parse(localStorage.getItem("timeVaranda")) == null) {
			content = document.createElement("li");
			var span = document.createElement("span");
			span.setAttribute("class","item_rega");
			span.appendChild(document.createTextNode("Nada Agendado."));
			content.appendChild(span);
			document.querySelector("#listaRegas").appendChild(content);
			localStorage.setItem("timeVaranda", JSON.stringify(document.querySelector("#listaRegas").innerHTML));
		}
		
		if(JSON.parse(localStorage.getItem("timeQuintal") == null)) {
			if(document.querySelector("#listaRegas").length == 0) {
				content = document.createElement("li");
				var span = document.createElement("span");
				span.setAttribute("class","item_rega");
				span.appendChild(document.createTextNode("Nada Agendado."));
				content.appendChild(span);
				document.querySelector("#listaRegas").appendChild(content);
			}
			localStorage.setItem("timeQuintal", JSON.stringify(document.querySelector("#listaRegas").innerHTML));
		}

		document.querySelector("#divisoes").value = localRega;
		if (localRega == "Varanda") {
			content = JSON.parse(localStorage.getItem("timeVaranda"));
			
			document.querySelector("#listaRegas").innerHTML = JSON.parse(localStorage.getItem("timeVaranda"));
		} else {
			content = JSON.parse(localStorage.getItem("timeQuintal"));
			document.querySelector("#listaRegas").innerHTML = JSON.parse(localStorage.getItem("timeQuintal"));
		}
	}
};




//rega

function deleteRega(butId) {
	var list = document.querySelector("#listaRegas").getElementsByTagName("li");
	for(var i = 0; i < list.length; i++) {
		var id = list[i].querySelector("[type=button]").id;
		if(id == butId) {
			list[i].remove();
		}
	}

	if(list.length == 0) {
		var li = document.createElement("li");
		var span = document.createElement("span");
		span.setAttribute("class","item_rega");
		span.appendChild(document.createTextNode("Nada Agendado."));
		li.appendChild(span);
		document.querySelector("#listaRegas").appendChild(li);
	}
	if(localRega == "Varanda"){
		localStorage.setItem("timeVaranda",JSON.stringify(document.querySelector("#listaRegas").innerHTML));
	} else {
		localStorage.setItem("timeQuintal",JSON.stringify(document.querySelector("#listaRegas").innerHTML));
	}
}



function timeSet() {
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


		setTimeout(function () {
			document.getElementById("time").remove();
		}, 2000);

		var li = document.createElement("li");
		var span = document.createElement("span");
		span.appendChild(document.createTextNode("Das "+pick1.value+" às "+pick2.value));
		span.setAttribute("class", "item_rega");
		li.appendChild(span);
		regas = document.querySelector("#listaRegas");
		var regasLi = document.querySelector("#listaRegas").getElementsByTagName("li");
		if(regasLi.length == 1 && regasLi[0].getElementsByTagName("span")[0].innerText == "Nada Agendado.") {
			regasLi[0].remove();
		}

		var num = 0;
		var id;

		if(localRega == "Varanda") {
			if (JSON.parse(localStorage.getItem("numVaranda") == null)) {
				localStorage.setItem("numVaranda",JSON.stringify(num));
			}
			num = JSON.parse(localStorage.getItem("numVaranda"));
			id = "button"+num;
			num++;
			localStorage.setItem("numVaranda",JSON.stringify(num));
			li.innerHTML += '<button class="segura" id="'+id+'" onclick=deleteRega("'+id+'") type="button">X</button>';
			regas.appendChild(li);
			localStorage.setItem("timeVaranda", JSON.stringify(regas.innerHTML));

		} else {
			if (JSON.parse(localStorage.getItem("numQuintal") == null)) {
				localStorage.setItem("numQuintal",JSON.stringify(num));
			}
			num = JSON.parse(localStorage.getItem("numQuintal"));
			id = "button"+JSON.parse(localStorage.getItem("numQuintal"));
			num++;
			localStorage.setItem("numQuintal",JSON.stringify(num));
			li.innerHTML += '<button class="segura" id="'+id+'" onclick=deleteRega("'+id+'") type="button">X</button>';
			regas.appendChild(li);
			localStorage.setItem("timeQuintal", JSON.stringify(regas.innerHTML));
		}
		
	}

}

function divisao() {
	localRega = document.querySelector("#divisoes").value;
	localStorage.setItem("localRega",JSON.stringify(localRega));
	if(localRega == "Varanda") {
		document.querySelector("#listaRegas").innerHTML = JSON.parse(localStorage.getItem("timeVaranda"));
	} else {
		document.querySelector("#listaRegas").innerHTML = JSON.parse(localStorage.getItem("timeQuintal"));
	}
	document.querySelector("#elem").innerHTML = localRega;
}

//cozinha
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
