function allocateIndividualInputs() {
  const splitEvenly =
    document.querySelector('#split-evenly').value === 'Yes' ? true : false;
  let individualTotalsSection = document.querySelector(
    '#individual-totals-section'
  );
  individualTotalsSection.innerHTML = '';

  let baseAmountSection = document.querySelector('#base-amount-section');
  if (splitEvenly) {
    baseAmountSection.innerHTML = `
      What is the amount before tips and taxes? <br/>
      <input id="base-amount" class="padding-top" type="text" oninput="this.value=validateNumber(this.value)">
    `;
    return;
  }

  baseAmountSection.innerHTML = '';
  const total = document.querySelector('#amount-of-people-input').value;

  for (let i = 1; i <= total; i++) {
    individualTotalsSection.innerHTML += `
      <div class="individualTotalRow">
        <input type="text" id="person-name-${i}" class="light-spacing" placeholder="Person ${i}"/>
        <input type="text" id="person-total-${i}" class="light-spacing" placeholder="Individual Total ($)" oninput="this.value=validateNumber(this.value)"/>
      </div>
      <p/>
    `;
  }
}

allocateIndividualInputs();

function calculate() {
  const taxAmount = parseFloat(
    document.querySelector('#tax-amount').value || 0
  );
  const tipAmount = parseFloat(
    document.querySelector('#tip-amount').value || 0
  );
  const isTipBasedOnPretax =
    document.querySelector('input[name="tipTaxPreference"]:checked').value ===
      'preTax' || isTipsPercentageSectionHidden();

  let results = document.querySelector('#results');
  // clear existing calculations for results
  results.innerHTML = '<h3>Calculations</h3> <p/>';

  if (Number.isNaN(taxAmount) || Number.isNaN(tipAmount)) {
    results.innerHTML = '<u>Please enter valid tax or tip amounts.</u>';
    return;
  }

  const taxType = document.querySelector('#tax-type').value;
  const tipType = document.querySelector('#tip-type').value;

  const splitEvenly =
    document.querySelector('#split-evenly').value === 'Yes' ? true : false;
  const numOfPeople = document.querySelector('#amount-of-people-input').value;

  if (splitEvenly) {
    // splitting the bill evenly
    const baseAmount = parseFloat(document.querySelector('#base-amount').value);
    const taxMultiplier = getMultiplier(baseAmount, taxType, taxAmount);
    const tipMultiplier = getMultiplier(baseAmount, tipType, tipAmount);

    let total = 0;
    let multiplier = isTipBasedOnPretax
      ? taxMultiplier + tipMultiplier + 1
      : (taxMultiplier + 1) * (tipMultiplier + 1);

    total = baseAmount * multiplier;
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
    let sum = 0;
    for (let i = 1; i <= numOfPeople; i++) {
      sum += parseFloat(document.querySelector(`#person-total-${i}`).value);
    }

    const taxMultiplier = getMultiplier(sum, taxType, taxAmount);
    const tipMultiplier = getMultiplier(sum, tipType, tipAmount);

    const multiplier = isTipBasedOnPretax
      ? taxMultiplier + tipMultiplier + 1
      : (taxMultiplier + 1) * (tipMultiplier + 1);

    let overallTotal = 0;
    let overallTipAmt = 0;
    let overallTaxAmt = 0;

    for (let i = 1; i <= numOfPeople; i++) {
      let personName =
        document.querySelector(`#person-name-${i}`).value || `Person ${i}`;
      let personTotal = parseFloat(
        document.querySelector(`#person-total-${i}`).value
      );
      if (Number.isNaN(personTotal)) {
        results.innerHTML = '<u>Please enter valid individual totals.</u>';
        return;
      }

      let individualTaxAmount = (personTotal * taxMultiplier).toFixed(2);
      let individualTotal = (personTotal * multiplier).toFixed(2);
      let individualTipAmount = (
        individualTotal -
        individualTaxAmount -
        personTotal
      ).toFixed(2);

      overallTotal += parseFloat(individualTotal);
      overallTipAmt += parseFloat(individualTipAmount);
      overallTaxAmt += parseFloat(individualTaxAmount);

      results.innerHTML += `
      <b>${personName}</b> will pay 
      <u>$${individualTotal}</u>  
      <span class="grayText">(tax: $${individualTaxAmount} + tip: $${individualTipAmount})</span><p/>`;
    }

    results.innerHTML += `
      Total: <u>$${overallTotal.toFixed(2)}</u> 
      <span class="grayText">
        (Subtotal: $${sum.toFixed(2)} + 
        Taxes: $${overallTaxAmt.toFixed(2)} +
        Tips: $${overallTipAmt.toFixed(2)})
      </span>
    `;
  }
}

// Generic number helpers
function getMultiplier(baseAmount, type, amount) {
  // this determines what the multipler is for the tax and tip
  if (type === '$') {
    return (baseAmount + amount) / baseAmount - 1;
  }
  return amount * 0.01;
}

function validateNumber(value) {
  // only allows numbers and one decimal at most
  return value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

// Tips
function changeTipAmount(tipAmount) {
  document.querySelector('#tip-amount').value = tipAmount;
}

function toggleTipsPercentagesSection() {
  // do not show this section if user selects $ for the tips preference
  if (isTipsPercentageSectionHidden()) {
    document.querySelector('.tipsBasedOnPercentages').style.display = 'block';
  } else {
    document.querySelector('.tipsBasedOnPercentages').style.display = 'none';
  }
}

function isTipsPercentageSectionHidden() {
  return (
    document.querySelector('.tipsBasedOnPercentages').style.display === 'none'
  );
}

// Taxes
function defaultTaxPercentage() {
  const nycTax = 8.875;
  if (document.querySelector('#tax-type').value === '%') {
    document.querySelector('#tax-amount').value = nycTax;
  } else {
    document.querySelector('#tax-amount').value = null;
  }
}
