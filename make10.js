//Global variables
let numbers = [];

let numArrangements = [];
let tempArray = [];
let finalNumArrangements = [];
let operationsArrangements = [];
let equations = [];

let rightCount = 0;
let wrongCount = 0;

//Move cursor for input boxes
function moveOnMax(field, nextFieldID) {
  if (field.value.length >= field.maxLength) {
    document.getElementById(nextFieldID).focus();
  }
}

//Retrieve numbers from input
function getNumbers() {
  for (let i = 1; i < 5; i++) {
    numbers.push(document.getElementById(`box${i}`).value);
  }
}

//All possible combinations of any 3 of the 4 maths operations
function arrangeOperations() {
  let operations = ["+", "-", "/", "*"];
  operations.forEach(o1 => {
    operations.forEach(o2 => {
      operations.forEach(o3 => {
        operationsArrangements.push([o1, o2, o3]);
      });
    });
  });
}

//All possible combinations of the 4 numbers
function arrangeNumbers() {
  numbers.forEach(n1 => {
    numbers.forEach(n2 => {
      numbers.forEach(n3 => {
        numbers.forEach(n4 => {
          numArrangements.push([n1, n2, n3, n4]);
          tempArray.push([n1, n2, n3, n4]);
        });
      });
    });
  });
}

//Check duplicate combinations in final array e.g. numbers = [1,3,1,4] ~~> array1 = [1,1,3,4], array2 = [1,1,3,4]
function checkIncludes(index) {
  let includes = false;
  finalNumArrangements.forEach(arr => {
    if (arr.toString() == numArrangements[index].toString()) {
      includes = true;
    }
  });
  return includes;
}

//Remove the combinations with any repetitions e.g. numbers = [1,2,3,4] ~~> array = [1,1,1,1]
function removeArraysWithDuplicates() {
  tempArray.filter((arr, index) => {
    if (
      arr.sort().toString() == numbers.sort().toString() &&
      !checkIncludes(index)
    ) {
      finalNumArrangements.push(numArrangements[index]);
    }
  });
}

//Create all possible equations to be computed
function createEquations() {
  let equation = "";
  for (let i = 0; i < finalNumArrangements.length; i++) {
    for (let k = 0; k < operationsArrangements.length; k++) {
      equation =
        finalNumArrangements[i][0] +
        operationsArrangements[k][0] +
        finalNumArrangements[i][1] +
        operationsArrangements[k][1] +
        finalNumArrangements[i][2] +
        operationsArrangements[k][2] +
        finalNumArrangements[i][3];

      //Original equations
      equations.push(equation);

      //e.g. 2+6/2+1 != (2+6)/2+1
      if (
        (equation.includes("+") || equation.includes("-")) &&
        (equation.includes("*") || equation.includes("/"))
      ) {
        addBrackets(equation, 0, 4); //Case 1
        addBrackets(equation, 0, 6); //Case 2
        addBrackets(equation, 2, 6); //Case 3
        addBrackets(equation, 2, 8); //Case 4
        addBrackets(equation, 4, 8); //Case 5
        addBrackets(equation, 0, 4, 6, 10); //Case 6
        addBrackets(equation, 0, 6, 3, 8); //Case 7
        addBrackets(equation, 2, 8, 3, 7); //Case 8
      }
    }
  }
}

//Add brackets to the equations
function addBrackets(equation, index1, index2, index3, index4) {
  let tempEquation = equation.split("");
  tempEquation.splice(index1, 0, "(");
  tempEquation.splice(index2, 0, ")");
  if (arguments.length == 5) {
    tempEquation.splice(index3, 0, "(");
    tempEquation.splice(index4, 0, ")");
  }
  equations.push(tempEquation.toString().replace(/,/g, ""));
}

//Evaluate solutions to equations and add them to respective table
function evaluateSolutions() {
  createTable("rightTable");
  createTable("wrongTable");
  equations.forEach(eq => {
    let ans = eval(eq);
    if (ans == 10) {
      rightCount++;
      fillTable("rightTable", eq, ans);
    } else {
      wrongCount++;
      fillTable("wrongTable", eq, ans);
    }
  });
  document.getElementById(
    "title1"
  ).innerHTML = `Successful Methods: ${rightCount}`;
  document.getElementById(
    "title2"
  ).innerHTML = `Unsuccessful Methods: ${wrongCount}`;
}

//Create both tables
function createTable(tableName) {
  let table = document.getElementById(tableName);
  let tr = document.createElement("tr");
  table.appendChild(tr);

  let th1 = document.createElement("th");
  let th2 = document.createElement("th");
  th1.innerHTML = "Generated Equations";
  th2.innerHTML = "Answer";
  tr.appendChild(th1);
  tr.appendChild(th2);
}

//Add each equation to respective table as it is generated and solved
function fillTable(id, eq, ans) {
  let table = document.getElementById(id);
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = "" + eq;
  cell2.innerHTML = ans.toFixed(2);
}

//Main
function compute() {
  if (numbers.length == 0) {
    getNumbers();
  } else {
    deleteTables();

    numbers = [];
    numArrangements = [];
    tempArray = [];
    finalNumArrangements = [];
    operationsArrangements = [];
    equations = [];
    rightCount = 0;
    wrongCount = 0;

    getNumbers();
  }
  arrangeNumbers();
  removeArraysWithDuplicates();
  arrangeOperations();
  createEquations();
  evaluateSolutions();
}

//Delete tables when generating new results
function deleteTables() {
  let table1 = document.getElementById("rightTable");
  let table2 = document.getElementById("wrongTable");
  while (table1.rows.length > 0) {
    document.getElementById("rightTable").firstElementChild.remove();
  }
  while (table2.rows.length > 0) {
    document.getElementById("wrongTable").firstElementChild.remove();
  }
}
