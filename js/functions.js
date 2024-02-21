// Задание 1

const checkSizeString = (string = '', maxSimbols = 1) => string.length <= maxSimbols;


console.log(checkSizeString('проверяемая строка', 20));

console.log(checkSizeString('проверяемая строка', 18));

console.log(checkSizeString('проверяемая строка', 10));



// Задание 2

const checkPalidrom = (string = '') => {

  string = string.replaceAll(' ', '').toUpperCase();

  let reverseString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }

  return reverseString === string;
}

console.log(checkPalidrom('топот'));

console.log(checkPalidrom('ДовОд'));

console.log(checkPalidrom('Кекс'));

console.log(checkPalidrom('Лёша на полке клопа нашёл '));

// Задание 3
/*
const extractNumber = (string) => {
  let result = '';

  for (let i = 0; i <= string.lenght - 1; i++) {
    if(Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
}

console.log(extractNumber('2023 год'));

console.log(extractNumber('ECMAScript 2022'));

console.log(extractNumber('1 кефир, 0.5 батона'));

console.log(extractNumber('агент 007'));

console.log(extractNumber('а я томат'));

console.log(extractNumber(2023));

console.log(extractNumber(-1));

console.log(extractNumber(1.5));
*/
