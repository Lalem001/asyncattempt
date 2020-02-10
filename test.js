// Tests based on lodash's attempt tests

const map = require('lodash/map');
const stubTrue = require('lodash/stubTrue');
const test = require('ava');

const asyncAttempt = require('.');

/* eslint-disable new-parens */
const errors = [
	new Error,
	new EvalError,
	new RangeError,
	new ReferenceError,
	new SyntaxError,
	new TypeError,
	new URIError,
];

/* eslint-enable new-parens */

class CustomError extends Error {}

test('should return result of function', async (t) => {
	const expected = {};
	const actual = await asyncAttempt(() => expected);
	t.is(actual, expected);
});

test('should provide additional `args` to `func`', async (t) => {
	const actual = await asyncAttempt((...args) => args, 1, 2);
	t.deepEqual(actual, [1, 2]);
});

test('should return caught error', async (t) => {
	const expected = map(errors, stubTrue);
	const promises = map(
		errors,
		async (error) => await asyncAttempt(() => { throw error; }) === error,
	);
	const actual = await Promise.all(promises);
	t.deepEqual(actual, expected);
});

test('should coerce errors into error objects', async (t) => {
	// eslint-disable-next-line no-throw-literal
	const actual = await asyncAttempt(() => { throw 'x'; });
	t.deepEqual(actual, Error('x'));
});

test('should preserve custom errors', async (t) => {
	const actual = await asyncAttempt(() => { throw new CustomError('x'); });
	t.true(actual instanceof CustomError);
});
