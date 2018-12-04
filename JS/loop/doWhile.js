let page = 1;
let temp = '';
let tempContainer = [];
const gap = 10;
console.log('enter count');

do {
  temp = await this.gainFailingUsers(ssoTicketResult.ssoToken, page);
  // console.log(i);
  tempContainer = tempContainer.concat(temp.data);
  
  if (page % gap === 0 || !temp.continue) {
    const message = page % gap === 0 ? '继续传输' : '检测完成';
    const percent = Math.floor((page * size) * 100 / this.searchParams.total);
    const data = {
      users: tempContainer,
      progress: `${percent >= 100 ? 100 : percent}%`,
      total: tempContainer.length,
    };
    tempContainer = []; // 赋值完后清空数据
    this.sendMessage(0, message, data);
  }
  page++;
} while (temp.continue);
