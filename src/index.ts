console.warn('TEST');
console.error('TEST AGAIN');
// console.log('FAILED TEST');

const makeMeAString = (
  arg: string | number | Date,
  options?: { [key: string]: string }
): string => {
  return arg.toString();
};

export default makeMeAString;
