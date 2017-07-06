const data = [
  {name: 'SP1', manufacturer: 'Apple', price: 500, sales: 20, status: 'old'},
  {name: 'SP2', manufacturer: 'Apple', price: 1500, sales: 10, status: 'new'},
  {name: 'SP3', manufacturer: 'Samsung', price: 500, sales: 10, status: 'old'},
  {name: 'SP4', manufacturer: 'Samsung', price: 1500, sales: 20, status: 'new'},
  {name: 'SP5', manufacturer: 'HTC', price: 1200, sales: 10, status: 'new'},
  {name: 'SP6', manufacturer: 'Motorola', price: 4500, sales: 10, status: 'old'},
  {name: 'SP7', manufacturer: 'Apple', price: 600, sales: 20, status: 'old'},
]

//========FIND===========
// tìm sản phẩm tên là 'SP5'
let SP5 = data.find(product => {
  return product.name === 'SP5';
})
//console.log('With find: ', SP5);

//========FILTER=========
// Tìm tất cả sản phẩm có status là 'old'
let oldProducts = [];
for (let i = 0; i < data.length; i++) {
  if (data[i].status === 'old') {
    oldProducts.push(data[i]);
  }
}
//console.log('With for loop: ', oldProducts);

// Cách mới với hàm filter() 
let oldProducts2 = data.filter((product) => {
  return product.status === 'old';
})

//console.log('With filter: ', oldProducts2);

//=========MAP==============
// 1 mảng data với giá sp mới 
// 1 cách viết tạo side effect mà nhiều người hay mắc phải -> mảng data gốc bị thay đổi
// let newArr = [];
// for (let i = 0; i < data.length; i++) {
//   let item = data[i];
//   item.price = item.price / 2;   
//   newArr.push(item);
//   console.log(data[i].price);
// }

let newArr = [];
for (let i = 0; i < data.length; i++) {
  let item = {};
  item.name = data[i].name;
  item.price = data[i].price / 2;
  newArr.push(item);
}
//console.log('With for loop: ', newArr);
//console.log(data);

// cách mới với hàm map()
newArr2 = data.map(product => {
  let newProduct = {};
  newProduct.name = product.name;
  newProduct.price = product.price / 2;
  return newProduct;
})
//console.log('With map: ', newArr2);
//console.log(data);

//==========REDUCE==============
// Đếm xem có bao nhiêu sản phẩm theo hãng sản xuất
let newObj = {};

for (let i = 0; i < data.length; i++) {
  let manufacturer = data[i].manufacturer;
  newObj[manufacturer] = newObj[manufacturer] + 1 || 1;
}
// console.log('With for loop: ', newObj);

// let obj = {'product_name': 'IPhone'}
// console.log(obj.product_name);
// console.log(obj['product_name']);
// let name2 = 'product_id';
// obj.name2 = 'Samsung';
// obj[name2] = 'HTC';
// console.log(obj);

// cách mới với reduce()
newObj2 = data.reduce((prev, next, index) => {
  console.log("<b>Iteration " + index + "</b>");
  console.log("prev:", prev);
  console.log("next:", next);
  let manufacturer = next.manufacturer;
  prev[manufacturer] = prev[manufacturer] + 1 || 1;
  console.log("Passing this to the 'prev' of the next iteration if any:", prev);
  console.log("---------------");
  return prev;
}, {})
//console.log('With reduce: ', newObj2);

//=======CHAINING METHODS====================
// Những hàm này có thể viết theo kiểu chaining
// Muốn tính tổng doanh thu 
totalRevenue = data.filter(product => {
  return product.manufacturer === 'Apple';
}).map(product => {
  return product.price * product.sales;
}).reduce((prev, next)=> {
  return prev + next;
})
console.log(totalRevenue);
