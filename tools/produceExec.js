const fs = require('fs');
const xlsx = require('node-xlsx');

/*
* data 需要和temp一样的结构
* */
function produceExec(data, headers, path) {
	headers = headers || ['ID', '专辑', '一级分类', '二级分类', '主播ID', '主播名称', '来源', '授权', '源站点播放量', '下发状态', '上线状态', '入库时间', '最后更新时间'];
	let temp = [headers];
	
	let buffer = xlsx.build([{ name: "mySheetName", data: temp.concat(data) }]);
	fs.writeFileSync(path || 'audio.xlsx', buffer, 'binary');
}

/*
@param {String} path [文件的路径]
@result {Object} [{表头key：value}]
* */
function parseExec(path) {
	/*
	* result:
	* result [ { name: 'mySheetName', data: [ [Array], [Array] ] } ]
	* */
  const workSheetsFromFile = xlsx.parse(path)[0];
  const sheetKeys = workSheetsFromFile.data.shift();
  const data = workSheetsFromFile.data;
  return data.map(i => sheetKeys.reduce((o, ii, index) => (o[ii] = i[index], o), {}));
}
// console.log('result', parseExec(`${__dirname}/audio.xlsx`));
// produceExec([[1,2,null,3]]);

exports.produceExec = produceExec;
exports.parseExec = parseExec;
