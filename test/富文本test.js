function colorRGB2Hex(color) {
	let rgb = color.split(',');
	let r = parseInt(rgb[0].split('(')[1]);
	let g = parseInt(rgb[1]);
	let b = parseInt(rgb[2].split(')')[0]);
	
	let hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	return hex;
}

function convert(baseHtml) {
	// 对于span的转换
	let finalStr = baseHtml.replace(/<span[^>]+?style=".*?<\/span>/g, function(outerMatch) {
		debugger
		let str = outerMatch.replace(/<span[^>]+?color: (rgb.*?\)).*?<\/span/, function(match, p1) {
			return match.replace(/>(.+)<\/span/, `><font color='${colorRGB2Hex(p1)}'>$1</font></span`);
		});
		str = str.replace(/<span[^>]+?font-weight: bold;.*?<\/span/, function(match) {
			return match.replace(/>(.+)<\/span/, '><b>$1</b></span');
		});
		str = str.replace(/<span[^>]+?font-style: italic;.*?<\/span/, function(match) {
			return match.replace(/>(.+)<\/span/, '><i>$1</i></span');
		});
		str = str.replace(/<span[^>]+?text-decoration-line: underline;.*?<\/span/, function(match) {
			return match.replace(/>(.+)<\/span/, '><u>$1</u></span');
		});
		return str;
	})
	// 对于a的转换
	finalStr = finalStr.replace(/<a[^>]+?style=".*?<\/a>/g, function(outerMatch) {
		debugger;
		let str = outerMatch.replace(/<a[^>]+?color: (rgb.*?\)).*?<\/a/, function(match, p1) {
			return match.replace(/>(.+)<\/a/, `><font color='${colorRGB2Hex(p1)}'>$1</font></a`);
		});
		str = str.replace(/<a[^>]+?font-weight: bold;.*?<\/a/, function(match) {
			return match.replace(/>(.+)<\/a/, '><b>$1</b></a');
		});
		str = str.replace(/<a[^>]+?font-style: italic;.*?<\/a/, function(match) {
			return match.replace(/>(.+)<\/a/, '><i>$1</i></a');
		});
		str = str.replace(/<a[^>]+?text-decoration-line: underline;.*?<\/a/, function(match) {
			return match.replace(/>(.+)<\/a/, '><u>$1</u></a');
		});
		return str;
	})
	debugger;
	return finalStr;
}

function judgeSpanExistNest(text) {
	debugger;
	let tempArr = text.split('</span>');
	let judgeArr = tempArr.map(i => /<span.+?<span.+?/.test(i));
	return judgeArr.some(item => item);
}

function clearUselessTag(html) {
	let finalStr = html;
	// 一次一次地清掉无用的span，保证span不出现镶嵌结构
	finalStr = finalStr.replace(/<span(.+?<span.+?<\/span>)/, function(match, p1) {
		if (/<span/.test(p1)) {
			let temp = `<span${p1.replace(/<span[^>]+>|<\/span>/g, '')}`;
			return temp;
		} else {
			return match
		}
	});
	if (
		judgeSpanExistNest(finalStr)) {
		return clearUselessTag(finalStr);
	} else {
		return finalStr;
	}
}

/*
* setup rules
* 1. span tag just can have one span tag
* 2. a tag is the same to the previous rule
* */
let firstStr = clearUselessTag(`<p>我<br><span style="text-decoration-line: underline;"><span style="font-weight: bold;">试&nbsp;</span></span><span style="text-decoration-line: underline;"><span style="font-weight: bold;"><br></span></span></p>`);

console.log('first', firstStr);

let secondStr = convert(firstStr);

console.log('second', secondStr);
/*
* ""<p><p><span style="font-weight: bold; color: rgb(0, 0, 0);"><b><font color='#000000'>【贴纸变身】</font></b></span>2018世界杯，V拍专门为宝贝们定制了燃起来又有点可爱的贴纸，pick你喜欢的国家，试试变身足球宝贝走两圈！</p><p><span style="font-weight: bold; color: rgb(0, 0, 0);"><b><font color='#000000'>【开拍有奖】</font></b></span>只要在本话题参与拍摄并发布成功，即可获得开拍奖励！有现金红包哦！</p><p><span style="font-weight: bold; color: rgb(0, 0, 0);"><b><font color='#000000'>【集赞奖励】</font></b></span>本话题结束后，会评选点赞数TOP5用户，每人可获得100元现金红包奖励，快拉小伙伴来给你点赞吧！<a href="http://ugcadmin.sz.uae.uc.cn" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(38, 150, 255); text-decoration-line: underline; font-weight: bold;"><u><b><font color='#ffffff'>活动规则详情&gt;&gt;</font></b></u></a></p></p>""
*
* "<p><span style="font-weight: bold; color: rgb(0, 0, 0);">【贴纸变身】</span>2018世界杯，V拍专门为宝贝们定制了燃起来又有点可爱的贴纸，pick你喜欢的国家，试试变身足球宝贝走两圈！</p><p><span style="font-weight: bold; color: rgb(0, 0, 0);">【开拍有奖】</span>只要在本话题参与拍摄并发布成功，即可获得开拍奖励！有现金红包哦！</p><p><span style="font-weight: bold; color: rgb(0, 0, 0);">【集赞奖励】</span>本话题结束后，会评选点赞数TOP5用户，每人可获得100元现金红包奖励，快拉小伙伴来给你点赞吧！<a href="http://ugcadmin.sz.uae.uc.cn" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(38, 150, 255); text-decoration-line: underline; font-weight: bold;">活动规则详情&gt;&gt;</a></p>"
*
* 【贴纸变身】2018世界杯，V拍专门为宝贝们定制了燃起来又有点可爱的贴纸，pick你喜欢的国家，试试变身足球宝贝走两圈！

【开拍有奖】只要在本话题参与拍摄并发布成功，即可获得开拍奖励！有现金红包哦！

【集赞奖励】本话题结束后，会评选点赞数TOP5用户，每人可获得100元现金红包奖励，快拉小伙伴来给你点赞吧！活动规则详情>>

"<p><span style="font-weight: bold; color: rgb(0, 0, 0);"><b><font color='#000000'>【贴纸变身】</font></b></span>2018世界杯，V拍专门为宝贝们定制了燃起来又有点可爱的贴纸，pick你喜欢的国家，试试变身足球宝贝走两圈！<br><span style="font-weight: bold; color: rgb(0, 0, 0);"><b><font color='#000000'>【开拍有奖】</font></b></span>只要在本话题参与拍摄并发布成功，即可获得开拍奖励！有现金红包哦！<br><span style="font-weight: bold; color: rgb(0, 0, 0);"><b><font color='#000000'>【集赞奖励】</font></b></span>本话题结束后，会评选点赞数TOP5用户，每人可获得100元现金红包奖励，快拉小伙伴来给你点赞吧！<a href="http://ugcadmin.sz.uae.uc.cn" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(38, 150, 255); text-decoration-line: underline;"><u><font color='#ffffff'>活动规则详情&gt;&gt;</font></u></a></p>"
* */
