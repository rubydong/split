function allocateIndividualInputs() {
  var splitEvenly = document.querySelector("#split-evenly").value === "Yes" ? true : false;
  var section = document.querySelector("#individual-totals-section");
  section.innerHTML = '';
  if (splitEvenly) {
    return;
  }

  var total = document.querySelector('#amount-of-people-input').value;

  for (var i = 1; i <= total; i++) {
    section.innerHTML +=
      `<input type="text" id="person-name-${i}" class="light-spacing" placeholder="Person ${i}"/>
       <input type="text" id="person-total-${i}" class="light-spacing" placeholder="Individual Total ($)"/>
       <p/>`;
  }
}

allocateIndividualInputs();

function calculate() {
  var baseAmount = parseFloat(document.querySelector("#base-amount").value);
  var taxType = document.querySelector("#tax-type").value;
  var taxAmount = parseFloat(document.querySelector("#tax-amount").value || 0);
  var tipType = document.querySelector("#tip-type").value;
  var tipAmount = parseFloat(document.querySelector("#tip-amount").value || 0);
  var splitEvenly = document.querySelector("#split-evenly").value === "Yes" ? true : false;
  var numOfPeople = document.querySelector("#amount-of-people-input").value;

  var multiplier = getMultiplier(baseAmount, taxType, taxAmount) + getMultiplier(baseAmount, tipType, tipAmount) + 1;
  console.log("final multiplier", multiplier);
  var results = document.querySelector("#results");
  var total = baseAmount;

  if (splitEvenly) {
    total = baseAmount * multiplier;
    if (Number.isNaN(total)) {
      results.innerHTML = "Please enter valid numbers.";
      return;
    } 

    results.innerHTML = 
    `The total is $${total} and the amount evenly split among ${numOfPeople} people is $${(total/numOfPeople).toFixed(2)}`;
  } else {
    results.innerHTML = '';
    for (var i = 1; i <= numOfPeople; i++) {
      var personName = document.querySelector(`#person-name-${i}`).value || `Person ${i}`;
      var personTotal = parseFloat(document.querySelector(`#person-total-${i}`).value);
      if (Number.isNaN(personTotal)) {
        results.innerHTML = "Please enter valid numbers.";
        return;
      }
      console.log(personName, personTotal, personTotal*multiplier);
      personTotal = (personTotal * multiplier);
      results.innerHTML += `${personName} will pay $${personTotal.toFixed(2)} <p/>`;
    }
  }
}

function getMultiplier(baseAmount, type, amount) {
  if (type === '$') {
    return ((baseAmount + amount) / baseAmount) - 1;
  }
  return amount * 0.01;
}