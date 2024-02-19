// Задание 1

const checkSizeString = (string, simbol) => {
  string = string.length;
  if (string <= simbol) {
    return true;
  }
  return false;

}
checkSizeString('');

// Задание 2

const checkPalidrom = (string) => {

let normalizeString = replaceAll(' ','').toUpperCase(string);

for (let reverseString = i - 1; i > 0; i--) {
  at(string);
}

if (normalizeString === reverseString) {
  return ('Palidrom');
}
}
checkPalidrom('топот');

// Задание 3

function toNumber(value) {
  return +value;
}

console.log(
  toNumber('2023 год'));

