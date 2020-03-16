let previousValue;

const asmd = ['+', '-', '×', '÷', '%'];

/**
 * 入力値を基に計算結果部分に表示する文字列を作成します。
 *
 * @param {String} resultVal
 * @param {String} inputVal
 * @returns resultVal
 */
const execProc = (resultVal, inputVal) => {
  // カンマ除去
  resultVal = resultVal.split(',').join('');
  // * → ×に、/ → ÷に置換
  inputVal = inputVal.replace('*', '×').replace('/', '÷');

  if (resultVal === '' && asmd.includes(inputVal)) {
    // 初回が+-×÷%の場合、ブランクを返す
    return resultVal;
  } else if (previousValue !== undefined && asmd.includes(previousValue.slice(-1))) {
    // 前回が+-×÷%の場合
    if (previousValue.slice(-1) === inputVal) {
      // 前回と今回が同じ文字列の場合、前回文字列をそのまま返す
      return previousValue;
    } else if (asmd.includes(inputVal)) {
      // 前回と別の+-×÷%の場合、最終文字列を切り取って後続処理を実施
      resultVal = resultVal.slice(0, -1);
    }
  }

  if (previousValue !== '0' || (previousValue === '0' && inputVal === '.')) {
    //前回が0以外、または前回が0で今回が「.」の場合
    resultVal += inputVal;
  } else {
    //前回が0の場合
    if (inputVal === '0') {
      //今回が0の場合
      resultVal += '';
    } else {
      //今回が0以外の場合
      resultVal = inputVal;
    }
  }
  // TODO:カンマ区切りのロジック見直す
  //result.value = commaSeparated(result.value);
  // 前回の入力値を保持
  previousValue = resultVal;
  return resultVal;
};

/**
 * 3桁毎にカンマ区切りにします。
 *
 * @param {String} inputVal
 */
const commaSeparated = inputVal =>
  Number(inputVal.split(',').join('')).toLocaleString(undefined, {
    maximumFractionDigits: 20,
  });

/**
 * 計算結果部分の+-×÷に応じた四則演算を行います。
 *
 * @param {Array} ary1
 * @param {Array} ary2
 * @returns dec.toNumber
 */
const execCalc = (ary1, ary2) => {
  let dec = new Decimal(ary1[0]);
  for (let i = 0; i < ary2.length; i++) {
    if (ary2[i] === '+') {
      // +の場合、加算
      dec = dec.plus(ary1[i + 1]);
    } else if (ary2[i] === '-') {
      // -の場合、減算
      dec = dec.minus(ary1[i + 1]);
    } else if (ary2[i] === '×') {
      // ×の場合、乗算
      dec = dec.times(ary1[i + 1]);
    } else if (ary2[i] === '÷') {
      // ÷の場合、除算
      dec = dec.div(ary1[i + 1]);
    }
  }
  return dec.toNumber();
};
