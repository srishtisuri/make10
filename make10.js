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

function arrangeOperations() {
  let operations = ["+", "-", "/", "*"];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        tempArray_x.push(operations[i]);
        tempArray_x.push(operations[j]);
        tempArray_x.push(operations[k]);
        console.log(`Array: ${tempArray_x}`);
      }
    }
  }
}

function arrangeNumbers() {
  let numbers = ["1", "2", "3", "4"];
  var numArrangements = [];
  var tempArray_y = [];

  // for (let i = 0; i < numbers.length ; i++) {
  //   let array = [...numbers];
  //   tempArray_y(array[i])
  //   array.splice(i, 1)
  //   for (let j = 0; j < array.length; j++) {
  //     tempArray_y(array[j])
  //     array.splice()
  //   }
  // }

  for (let i = 0; i < 4; i++) {
    tempArray_y.push(numbers[i]);
    for (let j = 1; j < 4; j++) {
      tempArray_y.push(numbers[j]);
      for (let k = 2; k < 4; k++) {
        tempArray_y.push(numbers[k]);
        for (let l = 3; l < 4; l++) {
          tempArray_y.push(numbers[l]);
          numArrangements.push(tempArray_y);
          //console.log(`Array: ${tempArray_y}`);
        }
        
      } 
    }
  }
  console.log(`Array: ${numArrangements}`)
}
