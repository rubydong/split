function allocateIndividualInputs() {
  var splitEvenly =
    document.querySelector('#split-evenly').value === 'Yes' ? true : false;
  var individualTotalsSection = document.querySelector(
    '#individual-totals-section'
  );
  individualTotalsSection.innerHTML = '';

  var baseAmountSection = document.querySelector('#base-amount-section');
  if (splitEvenly) {
    baseAmountSection.innerHTML = `What is the amount before tips and taxes? <br/>
        <input id="base-amount" class="padding-top" type="text">`;
    return;
  }

  baseAmountSection.innerHTML = '';
  var total = document.querySelector('#amount-of-people-input').value;

  for (var i = 1; i <= total; i++) {
    individualTotalsSection.innerHTML += `<input type="text" id="person-name-${i}" class="light-spacing" placeholder="Person ${i}"/>
       <input type="text" id="person-total-${i}" class="light-spacing" placeholder="Individual Total ($)"/>
       <p/>`;
  }
}

allocateIndividualInputs();

function calculate() {
  var taxAmount = parseFloat(document.querySelector('#tax-amount').value || 0);
  var tipAmount = parseFloat(document.querySelector('#tip-amount').value || 0);
  // var isTipBasedOnPretax =
  //   document.querySelector('input[name="tipTaxPreference"]:checked').value ===
  //   'preTax';
  // console.log('isTipBasedOnPretax', isTipBasedOnPretax);
  var results = document.querySelector('#results');
  // clear existing calculations for results
  results.innerHTML = '';

  if (Number.isNaN(taxAmount) || Number.isNaN(tipAmount)) {
    results.innerHTML = '<u>Please enter valid tax or tip amounts.</u>';
    return;
  }

  var taxType = document.querySelector('#tax-type').value;
  var tipType = document.querySelector('#tip-type').value;

  var splitEvenly =
    document.querySelector('#split-evenly').value === 'Yes' ? true : false;
  var numOfPeople = document.querySelector('#amount-of-people-input').value;

  if (splitEvenly) {
    // splitting the bill evenly
    var baseAmount = parseFloat(document.querySelector('#base-amount').value);
    var multiplier =
      getMultiplier(baseAmount, taxType, taxAmount) +
      getMultiplier(baseAmount, tipType, tipAmount) +
      1;

    var total = baseAmount * multiplier;
    if (Number.isNaN(total)) {
      results.innerHTML = '<u>Please enter a valid base amount total.</u>';
      return;
    }

    results.innerHTML = `The total is <u>$${total.toFixed(
      2
    )}</u> and the amount evenly split among ${numOfPeople} people is <u>$${(
      total / numOfPeople
    ).toFixed(2)}</u>.`;
  } else {
    // splitting the bill by individual totals
    var sum = 0;
    for (var i = 1; i <= numOfPeople; i++) {
      sum += parseFloat(document.querySelector(`#person-total-${i}`).value);
    }

    var taxMultiplier = getMultiplier(sum, taxType, taxAmount);
    var tipMultiplier = getMultiplier(sum, tipType, tipAmount);
    var multiplier = taxMultiplier + tipMultiplier + 1;

    let overallTotal = 0;
    let overallTipAmt = 0;
    let overallTaxAmt = 0;

    for (var i = 1; i <= numOfPeople; i++) {
      var personName =
        document.querySelector(`#person-name-${i}`).value || `Person ${i}`;
      var personTotal = parseFloat(
        document.querySelector(`#person-total-${i}`).value
      );
      if (Number.isNaN(personTotal)) {
        results.innerHTML = '<u>Please enter valid individual totals.</u>';
        return;
      }
      var individualTaxAmount = (personTotal * taxMultiplier).toFixed(2);
      var individualTipAmount = (personTotal * tipMultiplier).toFixed(2);
      var individualTotal = (personTotal * multiplier).toFixed(2);

      overallTotal += parseFloat(individualTotal);
      overallTipAmt += parseFloat(individualTipAmount);
      overallTaxAmt += parseFloat(individualTaxAmount);

      results.innerHTML += `
      <b>${personName}</b> will pay 
      <u>$${individualTotal}</u>  
      <span class="grayText">(tax: $${individualTaxAmount} + tip: $${individualTipAmount})</span><p/>`;
    }

    results.innerHTML += `
      The total is <u>$${overallTotal.toFixed(2)}</u> <br/>
      The subtotal amount is $${sum.toFixed(2)} <br/>
      Taxes paid: $${overallTaxAmt.toFixed(2)} <br/>
      Tips paid: $${overallTipAmt.toFixed(2)}
    `;
  }
}

function getMultiplier(baseAmount, type, amount) {
  // this determines what the multipler is for the tax and tip
  if (type === '$') {
    return (baseAmount + amount) / baseAmount - 1;
  }
  return amount * 0.01;
}

function changeTipAmount(tipAmount) {
  document.querySelector('#tip-amount').value = tipAmount;
}

function toggleTipsPercentagesSection() {
  // do not show this section if user selects $ for the tips preference
  if (
    document.querySelector('.tipsBasedOnPercentages').style.display === 'none'
  ) {
    document.querySelector('.tipsBasedOnPercentages').style.display = 'block';
  } else {
    document.querySelector('.tipsBasedOnPercentages').style.display = 'none';
  }
}
