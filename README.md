# Functional-Programming
demo JS functions such as map(), reduce(), filter(), etc.

### Chạy index.js
```
$ node index.js
```

### Giải thích thêm
* Sử dụng các hàm built-in cho Array của JavaScipt thay vì viết vòng lặp for
* Lợi ích:
 * Sử dụng hàm built-in ngắn gọn, tên hàm xúc tích miêu tả sẵn mục đích của hàm
 * Theo phong cách functional programming: mỗi hàm thực hiện 1 mục đích riêng biệt, nhận input và trả về output
 * Hạn chế đc các side effects: ảnh hưởng đến dữ liệu gốc, thay đổi dữ liệu gốc ngoài ý muốn -> những side effects rất khó debug

```js
// mảng data gốc
const data = [
  {name: 'SP1', manufacturer: 'Apple', price: 500, sales: 20, status: 'old'},
  {name: 'SP2', manufacturer: 'Apple', price: 1500, sales: 10, status: 'new'},
  {name: 'SP3', manufacturer: 'Samsung', price: 500, sales: 10, status: 'old'},
  {name: 'SP4', manufacturer: 'Samsung', price: 1500, sales: 20, status: 'new'},
  {name: 'SP5', manufacturer: 'HTC', price: 1200, sales: 10, status: 'new'},
  {name: 'SP6', manufacturer: 'Motorola', price: 4500, sales: 10, status: 'old'},
  {name: 'SP7', manufacturer: 'Apple', price: 600, sales: 20, status: 'old'},
]
```

#### Ví dụ 1 side effect hay gặp 
```js
// 1 cách viết tạo side effect mà nhiều người hay mắc phải -> mảng data gốc bị thay đổi
 let newArr = [];
 for (let i = 0; i < data.length; i++) {
   let item = data[i]; // gán item bằng 1 phần tử trong mảng data 
   item.price = item.price / 2;   // thay đổi thuộc tính price của item -> data.price cũng thay đổi theo
   newArr.push(item);
 }
// sau khi chạy vòng lặp này, chúng ta có 1 mảng newArr với price bằng 1 nửa
// những chính mảng data gốc cũng đồng thời bị thay đổi dù đây không phải là chủ ý của chúng ta
// => đây chính là 1 side effect
```
* **Tại sao data lại bị thay đổi**: Quy tắc của JS: pass by value hay pass by reference 
 * JS luôn là pass by value, tuy nhiên khi gán arrays hay objects thì 'value' đc pass lại là 'reference' tới object hay mảng này
 * Khi pass by value: thay đổi giá trị của biến đc gán sẽ không thay đổi giá trị gốc
 * Ví dụ ở dưới trong hàm `changeObject(x)` khi thay giá trị của biến `x` với một object mới, giá trị của biến `x` ở ngoài không bị thay đổi, vì biến `x` bên trong hàm lúc này hoàn toàn trỏ đến 1 object mới
 * Tuy nhiên, khi thay đổi thuộc tính `member` thì cả biến `x` bên trong hàm và ngoài hàm đều bị thay đổi
 ```js
function changeObject(x) {
  x = {member:"bar"};
  console.log("in changeObject: " + x.member);
}

function changeMember(x) {
  x.member = "bar";
  console.log("in changeMember: " + x.member);
}

var x = {member:"foo"};

console.log("before changeObject: " + x.member);
changeObject(x);
console.log("after changeObject: " + x.member); /* change did not persist */

console.log("before changeMember: " + x.member);
changeMember(x);
console.log("after changeMember: " + x.member); /* change persists */
```
* Kết quả:
```
before changeObject: foo
in changeObject: bar
after changeObject: foo

before changeMember: foo
in changeMember: bar
after changeMember: bar
```

#### 2 Cách Truy Xuất Giá Trị Của 1 Thuộc Tính (property) Của Object
* `obj.propertyName`: Khi dùng `.` thì sẽ hiểu đấy là tên thuộc tính của object luôn
* `obj['property_name']`: Khi dùng `[..]` thì bên trong phải là 1 chuỗi
* Có thể truy vấn thuộc tính qua 1 biến, biến này lưu tên thuộc tính theo dạng chuỗi
```js
let obj = {'product_name': 'IPhone'}
console.log(obj.product_name);
console.log(obj['product_name']);
let name2 = 'product_id';
obj.name2 = 'Samsung'; // dùng '.' thì name2 đc hiểu trực tiếp là tên thực của thuộc tính
obj[name2] = 'HTC'; // dùng [] thì truyền vào giá trị của biến name2 là 'product_id'
console.log(obj);
```
* Kết quả:
```
IPhone
IPhone
{ product_name: 'IPhone', name2: 'Samsung', product_id: 'HTC' }
```