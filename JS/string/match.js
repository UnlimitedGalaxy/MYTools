/*
*
* */

/*
* question:
* . if not matched, what will return
*   conjecture:
*    -the result is null
*   fact:
*   - the conjecture is correct;
* */
var testStr = '<p><img src="http://cdn-sparkoa.xiaojiaoyu100.com/80615c2f-e26c-4f8c-8894-448c2feff949.png" title="80615c2f-e26c-4f8c-8894-448c2feff949.png" alt="内推注册统计.png"/></p>';
console.log(testStr.match(/<p>|<\/p>|<img>|<\/img>/));