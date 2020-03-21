const appendScript = URL => {
  var el = document.createElement('script');
  el.src = URL;
  document.body.appendChild(el);
};

let loadfile = ['./js/decimal.js', './js/base.js', './js/calc.js', './js/event.js'];

loadfile.forEach(value => appendScript(value));
