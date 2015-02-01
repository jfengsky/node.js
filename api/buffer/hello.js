//var testChar = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
//
//console.log(testChar);
//console.log(testChar.toString());
//
//var testChar2 = new Buffer('hello', 'utf8');
//console.log(testChar2);
//
//var testChar3 = testChar2;
//testChar3[4] = 0x6c;
//
//console.log(testChar3.toString());
//console.log(testChar2.toString());
//console.time('start');
var a = new Buffer('hello');

var b = a;

// 创建一个与a等长度的c buffer
var c = new Buffer(a.length);
// 然后把a全部赋值给c
a.copy(c);

console.log(a);
console.log(b);
console.log(c);
//console.timeEnd('end');