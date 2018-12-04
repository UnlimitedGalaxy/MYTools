var Readable = require('stream').Readable;
var rs = Readable();

var c = 97;
console.log('hello')
debugger;
rs._read = function () {
	rs.push(String.fromCharCode(c++));
	if (c > 'z'.charCodeAt(0)) rs.push(null);
	
};

rs.pipe(process.stdout);

/*
* ？
* process stdin
* command：head tail
*
* */