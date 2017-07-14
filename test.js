const data = [1 , 2 ,3];

const mapData = data.map(ele => {
  return ele * 2;
})
let forData = [];
data.forEach(ele => {
  forData.push(ele*2);
})
console.log(forData);
console.log(mapData);
console.log(data);

const reduceData = data.reduce((initialValue, nextValue) => {
  console.log('initialValue', initialValue);
  console.log('nextValue', nextValue);
  return initialValue + nextValue;
}, 10)
console.log(reduceData);