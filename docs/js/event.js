const inputBtn = {
  '0': pushBtn,
  '1': pushBtn,
  '2': pushBtn,
  '3': pushBtn,
  '4': pushBtn,
  '5': pushBtn,
  '6': pushBtn,
  '7': pushBtn,
  '8': pushBtn,
  '9': pushBtn,
  '+': pushBtn,
  '-': pushBtn,
  '×': pushBtn,
  '÷': pushBtn,
  '.': pushBtn,
  '%': pushBtn,
  '=': pushCalc,
  C: pushClear,
  Del: pushDel,
  '+/-': pushChangePlusMinus,
};

document.querySelectorAll('button').forEach(function(button) {
  inputBtn[button.innerHTML] !== undefined
    ? button.addEventListener('click', inputBtn[button.innerHTML])
    : '';
});

const inputKey = {
  '0': pushNumericKeypad,
  '1': pushNumericKeypad,
  '2': pushNumericKeypad,
  '3': pushNumericKeypad,
  '4': pushNumericKeypad,
  '5': pushNumericKeypad,
  '6': pushNumericKeypad,
  '7': pushNumericKeypad,
  '8': pushNumericKeypad,
  '9': pushNumericKeypad,
  '+': pushNumericKeypad,
  '-': pushNumericKeypad,
  '*': pushNumericKeypad,
  '/': pushNumericKeypad,
  '.': pushNumericKeypad,
  Enter: pushCalc,
  Delete: pushClear,
  Backspace: pushDel,
};

document.addEventListener('keydown', event => {
  inputKey[event.key] !== undefined ? inputKey[event.key]({ arg: event.key }) : '';
});
