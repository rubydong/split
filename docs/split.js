let people = document.querySelector(".people");
let even = document.querySelector(".split-even");
let exact = document.querySelector(".split-exact");

function addPerson() {
	let p =  
		"<div class='person'>" + 
			"<h3>Other <img class='remove' src='./trash.svg' onClick='removePerson(this)'/></h3>"+ 
			"<input class='personName' type='text' placeholder='Name' />" +	
			"<input class='personTotal margin-left' type='text' placeholder='Total ($)' />" +	
		"</div>";

	people.insertAdjacentHTML('beforeend', p);
}

function removePerson(person) {
	people.removeChild(person.parentNode.parentNode);
}

function calculate() {	
	let tip = document.querySelector(".tip");
	let tax = document.querySelector(".tax");
	let result = document.querySelector(".result");

	if (document.getElementsByName("calc")[0].checked) {
		let names = document.querySelectorAll(".personName");
		let total = document.querySelectorAll(".personTotal");

		result.innerHTML = "";
		tip = tip.value == "" ? 0 : tip.value * 0.01;
		tax = tax.value == "" ? 0 : tax.value * 0.01;
		total.forEach((t, i) => {
			if (!isNaN(t.value) && names[i].value != "") {
				let val = parseInt(t.value);
				t = val + val * tip + val * tax;
				result.innerHTML += names[i].value + " will pay $" + Math.round(t * 100)/100 + "<p/>";
			} 
		});

	} else {
		let number = document.querySelector(".simplePeople").value;
		let total = document.querySelector(".simpleTotal").value;

		if (total !== "" && number !== "") {
			result.innerHTML = "Everyone will pay $" + ((total/number) * 100) / 100 + " each <p/>";
		}
	}

	result.innerHTML += result.innerHTML === "" ? "Please provide valid inputs.<p/>" : "";
	result.innerHTML += "<button onClick=window.location.reload()>Calculate again?</button>";
}

function toggleVisibility(value) {	
	even.classList.toggle("display-none");
	exact.classList.toggle("display-none");
}