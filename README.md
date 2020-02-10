# Async Attempt

> Like `lodash.attempt` but asynchronous.

## Install
```shell script
$ npm install async-attempt
```

## Usage
```js
(async () => {
    let result = await asyncAttempt(() => getPromise());

    if (result instanceof Error) {
        result = [];
    }
})()
```

## Related

- [_.attempt] - The method that this package is inspired by.

[_.attempt]: https://lodash.com/docs/4.17.15#attempt
