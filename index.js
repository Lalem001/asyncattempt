const objectToString = Object.prototype.toString;

const isObjectLike = (value) => value !== null || typeof value === 'object';

const isPlainObject = (value) => isObjectLike(value) && value.constructor === Object;

const isError = (value) => {
	if (!isObjectLike(value)) return false;
	const tag = objectToString.call(value);
	return tag === '[object Error]'
		|| tag === '[object DOMException]'
		|| (typeof value.message === 'string' && typeof value.name === 'string' && !isPlainObject(value));
};

/**
 * Like lodash's attempt, but awaits the result of the passed function
 * @param {Function} func The function to attempt.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {*} Returns the `func` result or an error object.
 */
async function asyncAttempt(func, ...args) {
	try {
		return await func(...args);
	} catch (err) {
		return isError(err) ? err : new Error(err);
	}
}

module.exports = asyncAttempt;
