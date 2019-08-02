function deleteLinebreak(str) {
  return str.replace(/\n+/g, '');
}
var temp = `转至：陶玉茹`

console.log(deleteLinebreak(temp))

