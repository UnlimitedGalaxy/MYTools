const { total, size } = query;

const totalPages = Math.ceil(total / size);


// i 递增获取数据
while (++i <= totalPages) {

}

var i = self.fireworks.length;
while(i--){
  var f = self.fireworks[i];
  f.draw();
};
