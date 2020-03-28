//Global variables
let num1 = getNumber("box1");
let num2 = getNumber("box2");
let num3 = getNumber("box3");
let num4 = getNumber("box4");

let numbers = "1230".split("");

let numArrangements = [];
let tempArray = [];
let finalNumArrangements = [];
let operationsArrangements = [];
let equations = [];

//Move cursor for input boxes
function moveOnMax(field, nextFieldID) {
  if (field.value.length >= field.maxLength) {
    document.getElementById(nextFieldID).focus();
  }
}

//Retrieve numbers from input
function getNumber(id) {
  return document.getElementById(id).value;
}

//All possible combinations of any 3 of the 4 maths operations
function arrangeOperations() {
  let operations = ["+", "-", "/", "*"];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        operationsArrangements.push([
          operations[i],
          operations[j],
          operations[k]
        ]);
      }
    }
  }
}

//All possible combinations of the 4 numbers
function arrangeNumbers() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        for (let l = 0; l < 4; l++) {
          numArrangements.push([
            numbers[i],
            numbers[j],
            numbers[k],
            numbers[l]
          ]);

          tempArray.push([numbers[i], numbers[j], numbers[k], numbers[l]]);
        }
      }
    }
  }
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

//Remove the combinations with any repetitions e.g. numbers = [1,2,3,34] ~~> array = [1,1,1,1]
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
  let count = 0;
  let equation = "";
  let countSuccess = 0;
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
      count++;

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

function evaluateSolutions() {
  equations.forEach(eq => {
    if (eval(eq) == 10) {
      console.log(eq + " = 10!");
    } else if (
      eq.includes("/0") ||
      eval(eq) == Infinity ||
      eval(eq) == -Infinity
    ) {
      console.log(eq + " = undefined");
    } else {
      console.log(eq + " = " + eval(eq) + " :(");
    }
  });
}

function compute() {
  arrangeNumbers();
  removeArraysWithDuplicates();
  arrangeOperations();
  createEquations();
  evaluateSolutions();
}

// console.log(
//   // "Equation: " +
//   equation //.replace(/,/g, "")
//   //" Answer: " + eval(equation)
//   // " Count: " +
//   // count
// );
