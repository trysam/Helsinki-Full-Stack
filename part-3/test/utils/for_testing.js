const reverse = (string) => string.split('').reverse().join('');

const reducer = (sum, item) => sum + item;
const average = (array) => (array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length);

module.exports = { reverse, average };
