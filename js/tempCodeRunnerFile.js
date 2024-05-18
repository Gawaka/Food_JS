const promisify = (item, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(item);
        }, delay);
    });
};

const a = () => {
    return promisify('a', 100);
};

const b = () => {
    return promisify('b', 5000);
};

const c = () => {
    return promisify('c', 3000);
};

const three = async () => {
    const output1 = await a();
    const output2 = await b();
    const output3 = await c();
    return `three is done: ${output1} ${output2} ${output3}`;
};

three().then(console.log);