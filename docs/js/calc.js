let result = document.getElementById('result');
let calc = document.getElementById('calc');
let repString = '/*/g';
let reppString = '///g';

/**
 * ボタン(0～9、+、-、×、÷、.)押下時の関数です。
 *
 * @param {MouseEvent} btn
 */
const pushBtn = btn => (result.value = execProc(result.value, btn.target.innerHTML));

/**
 * テンキー(0～9、+、-、*、/、.)入力時の関数です。
 *
 * @param {KeyboardEvent}} key
 */
const pushNumericKeypad = key => (result.value = execProc(result.value, key.arg));

/**
 * Cボタン、Delete押下時の関数です。
 *
 * 計算表示部分、結果表示部分をクリアします。
 */
const pushClear = () => {
  calc.value = '';
  result.value = '';
};

/**
 * Delボタン、Backspace押下時の関数です。
 *
 * 計算表示部分をクリア、結果表示部分の末尾を削除します。
 */
const pushDel = () => {
  calc.value = '';
  // TODO:カンマ区切りのロジックを見直す
  // result.value = commaSeparated(result.value).slice(0, -1);
  result.value = result.value.slice(0, -1);
};

/**
 * +/-ボタン押下時の関数です。
 *
 * 結果表示部分の先頭に+/-付与します。
 */
const pushChangePlusMinus = () =>
  (result.value = result.value.slice(0, 1) !== '-' ? '-' + result.value : result.value.slice(1));

/**
 * =ボタン、Enter押下時の関数です。
 *
 */
const pushCalc = () => {
  // +-×÷を格納する配列
  let asmdAry = [];

  // 入力値の数字を格納する配列
  let splitAry = [];
  // 分割した入力値文字列を結合するための文字列
  let splitVal = '';

  // 計算結果部分の文字列を分割し、配列化
  let resultSplit = Array.from(result.value);
  // TODO:ここのロジックがイマイチなため見直し
  // TODO:四則演算の優先順位を考慮していないので要見直し
  resultSplit.forEach(val => {
    if (asmd.includes(val)) {
      asmdAry.push(val.replace('%', '÷'));
      splitAry.push(splitVal);
      splitVal = '';
    } else {
      splitVal += val;
    }
  });
  // TODO:この%のロジックだと考慮が漏れているので見直し
  splitVal === '' && resultSplit.includes('%') ? splitAry.push('100') : splitAry.push(splitVal);

  calc.value = result.value;
  result.value = execCalc(splitAry, asmdAry);
};
