let result = document.getElementById('result');
let calc = document.getElementById('calc');

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
  // 計算結果部分の文字列分割
  calc.value = splitValue(result.value);
  result.value = execCalc(splitAry, asmdAry);
};
