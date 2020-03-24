//Global variables
let num1 = getNumber("box1");
let num2 = getNumber("box2");
let num3 = getNumber("box3");
let num4 = getNumber("box4");

let numbers = ["2", "1", "3", "4"];

let numArrangements = [];
let tempArray = [];
let finalArrangements = [];
let operationsArrangements = [];

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

//Check duplicate combinations in the final array
function checkIncludes(index) {
  let includes = false;
  finalArrangements.forEach(arr => {
    if (arr.toString() == numArrangements[index].toString()) {
      includes = true;
    }
  });
  return includes;
}

//Remove the combinations with any repetitions
function removeArraysWithDuplicates() {
  tempArray.filter((arr, index) => {
    if (
      arr.sort().toString() == numbers.sort().toString() &&
      !checkIncludes(index)
    ) {
      finalArrangements.push(numArrangements[index]);
    }
  });
}

function createEquations() {
  let l = 0;
  let j = 0;
  let count = 0;
  let equation = "";
  for (let i = 0; i < finalArrangements.length; i++) {
    for (let k = 0; k < operationsArrangements.length; k++) {
      equation =
        finalArrangements[i][j] +
        operationsArrangements[k][l] +
        finalArrangements[i][j + 1] +
        operationsArrangements[k][l + 1] +
        finalArrangements[i][j + 2] +
        operationsArrangements[0][l + 2] +
        finalArrangements[i][j + 3];
      l = 0;
      j = 0;
      count++;
      console.log("Equation: " + equation + " Count: " + count);
    }
  }
}

function compute() {
  arrangeNumbers();
  removeArraysWithDuplicates();
  arrangeOperations();
  createEquations();
}
