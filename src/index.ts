/**
 * Lourd de chez lourd
 */
console.warn('TEST');
console.error('TEST AGAIN');
// console.log('FAILED TEST');

const makeMeAString = (
  arg: string | number,
  options?: { [key: string]: string }
): string => {
  return arg.toString();
};

export default makeMeAString;
