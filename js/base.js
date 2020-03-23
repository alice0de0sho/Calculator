// +-×÷を格納する配列
var asmdAry = [];
// 入力値の数字を格納する配列
var splitAry = [];

// 分割した入力値文字列を結合するための文字列
let splitVal = '';

// 四則演算と%の配列
const asmd = ['+', '-', '×', '÷', '%'];

// 前回の入力値
let previousValue;

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

  // TODO:複数の四則演算の場合ダメ
  // if (asmd.includes(inputVal) || asmd.includes(resultVal)) {
  //   splitAry = resultVal.split(inputVal);
  // }
  // TODO:カンマ区切りのロジック見直す
  // resultVal = commaSeparated(resultVal);
  // 入力値の数字を格納する配列
  // console.log(splitAry);
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
  let dec = new Decimal(ary1[0].split(',').join(''));
  for (let i = 0; i < ary2.length; i++) {
    if (ary2[i] === '+') {
      // +の場合、加算
      dec = dec.plus(ary1[i + 1].split(',').join(''));
    } else if (ary2[i] === '-') {
      // -の場合、減算
      dec = dec.minus(ary1[i + 1].split(',').join(''));
    } else if (ary2[i] === '×') {
      // ×の場合、乗算
      dec = dec.times(ary1[i + 1].split(',').join(''));
    } else if (ary2[i] === '÷') {
      // ÷の場合、除算
      dec = dec.div(ary1[i + 1].split(',').join(''));
    }
  }
  clearVariable();
  return commaSeparated(dec.toString());
};

/**
 * 四則演算配列、計算値配列、値作成文字列をクリアします。
 *
 */
const clearVariable = () => {
  asmdAry = [];
  splitAry = [];
  splitVal = '';
};

/**
 * 計算結果部分を値、四則演算に分割します。
 *
 * @param {String} argVal
 */
const splitValue = argVal => {
  // 計算結果部分の文字列を分割し、配列化
  let resultSplit = Array.from(argVal);

  // 計算表示部分に記載する内容を生成
  let calcVal = '';

  resultSplit.forEach((val, i) => {
    if (i !== 0 && asmd.includes(val)) {
      asmdAry.push(val.replace('%', '÷'));
      splitAry.push(commaSeparated(splitVal));
      calcVal += commaSeparated(splitVal) + val.replace('%', '÷');
      splitVal = '';
    } else {
      splitVal += val;
    }
  });
  // TODO:この%のロジックだと考慮が漏れているので見直し
  if (splitVal === '' && resultSplit.includes('%')) {
    splitAry.push('100');
  } else {
    splitAry.push(commaSeparated(splitVal));
    calcVal += commaSeparated(splitVal);
  }
  return calcVal;
};
