const name = 'wrold';

console.log(`hello ${name}`);

const sleep = t => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t);
  })
}
async () => {
  await sleep(3000);
  console.log('1000');
  await sleep(3000);
  console.log('1000');
}
