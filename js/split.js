const INDIVIDUAL_SUBTOTAL_PLACEHOLDER = "Individual subtotal";
const ADDITIONAL_EXPENSE_PLACEHOLDER = "Additional expense";
const onInputChange = "this.value=validateNumber(this.value)";

const allocateIndividualInputs = () => {
  let individualTotalsSection = document.querySelector(
    "#individual-totals-section"
  );
  individualTotalsSection.innerHTML = "";

  const total = document.querySelector("#amount-of-people-input").value;

  for (let i = 1; i <= total; i++) {
    individualTotalsSection.innerHTML += `
    <div class="row" id="individualTotalRow-${i}">
      <div class="input-field col s4 offset-s2">
        <input type="text" id="person-name-${i}" placeholder="Name"/>
        <label for="person-name-${i}">Person ${i}</label>
      </div>
      <div class="input-field col s4">
      <input type="text" class="person-${i}-expense" placeholder="${INDIVIDUAL_SUBTOTAL_PLACEHOLDER}" oninput="${onInputChange}"/>
      </div>
      <div class="input-field col">
        <button class="additionalExpenseButton" onclick="addAdditionalExpense(${i})">+</button>
      </div>
    </div>
    <div class="row">
      <div class="additionalExpensesSection" id="additionalExpensesSection-${i}"/>
    </div>
    `;
  }
};

allocateIndividualInputs();

const calculate = () => {
  const results = document.querySelector("#results");
  // clear existing calculations for results
  results.innerHTML = "<h3>Calculations</h3> <p/>";

  const numOfPeople = document.querySelector("#amount-of-people-input").value;
  const totalAmount = parseFloat(document.querySelector("#total").value);

  if (Number.isNaN(totalAmount)) {
    results.innerHTML = "<u>Please enter a total.</u>";
    return;
  }
  let overallSubtotal = 0;
  const individualTotalMap = {};

  for (let i = 1; i <= numOfPeople; i++) {
    let individualSum = 0;
    const individualExpenses = document.querySelectorAll(
      `.person-${i}-expense`
    );
    individualExpenses.forEach((expense) => {
      individualSum += parseFloat(expense.value) || 0;
    });
    individualTotalMap[i] = individualSum;
    overallSubtotal += individualSum;
  }

  for (let i = 1; i <= numOfPeople; i++) {
    const personName =
      document.querySelector(`#person-name-${i}`).value || `Person ${i}`;
    const individualSum = individualTotalMap[i];
    if (Number.isNaN(individualSum) || individualSum === 0) {
      results.innerHTML = "<u>Please enter valid individual totals.</u>";
      return;
    }

    const individualTotal = getIndividualTotal(
      individualSum,
      overallSubtotal,
      totalAmount
    );
    if (Number.isNaN(individualTotal)) {
      results.innerHTML = "<u>Please enter valid individual totals.</u>";
      return;
    }

    results.innerHTML += `
        <b>${personName}</b> will pay 
        <u>$${individualTotal}</u>  
        <p/>
      `;
  }
};

const getIndividualTotal = (individualSubtotal, subtotal, total) => {
  return ((individualSubtotal / subtotal) * total).toFixed(2);
};

const validateNumber = (value) => {
  // only allows numbers and one decimal at most
  return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
};

// id for dealing with additional expenses
const generateRandomString = () => {
  return "expense" + Math.random().toString(36).substring(2, 7);
};

const addAdditionalExpense = (person) => {
  const randomString = generateRandomString();
  const div = document.createElement("div");
  div.className = "row";
  div.id = randomString;

  const inputDiv = document.createElement("div");
  inputDiv.className = "input-field col s4 offset-s6";

  const input = document.createElement("input");
  input.type = "text";
  input.className = `person-${person}-expense`;

  input.id = `${randomString}-input`;
  input.placeholder = ADDITIONAL_EXPENSE_PLACEHOLDER;
  input.setAttribute("oninput", onInputChange);

  const removeButtonDiv = document.createElement("div");
  removeButtonDiv.className = "input-field col";

  const removeButton = document.createElement("button");
  removeButton.className = "removeExpenseButton";
  removeButton.onclick = () => removeAdditionalExpense(`#${randomString}`);
  removeButton.textContent = "-";

  div.appendChild(inputDiv);
  div.appendChild(removeButtonDiv);
  inputDiv.appendChild(input);
  removeButtonDiv.append(removeButton);

  let p = document.createElement("p");

  const additionalExpensesForPerson = document.querySelector(
    `#additionalExpensesSection-${person}`
  );
  additionalExpensesForPerson.append(p);
  additionalExpensesForPerson.append(div);
};

const removeAdditionalExpense = (randomString) => {
  const currNode = document.querySelector(randomString);
  if (currNode) {
    currNode.parentElement.removeChild(currNode);
  }
};
