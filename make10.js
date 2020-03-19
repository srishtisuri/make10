let num1 = getNumber("box1");
let num2 = getNumber("box2");
let num3 = getNumber("box3");
let num4 = getNumber("box4");

function moveOnMax(field, nextFieldID) {
  if (field.value.length >= field.maxLength) {
    document.getElementById(nextFieldID).focus();
  }
}

function getNumber(id) {
  return document.getElementById(id).value;
}

function calculate() {
  let operations = ["+", "-", "/", "*"];
  let numbers = [num1, num2, num3, num4];
  let tempArray_i = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        let tempArray_i = [];
        tempArray_i.push(operations[i]);
        tempArray_i.push(operations[j]);
        tempArray_i.push(operations[k]);
        console.log(`Array: ${tempArray_i}`);
      }
    }
  }
}
