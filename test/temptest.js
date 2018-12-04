const fetch = require('../tools/fetch')

fetch.GET({
  uri: 'http://vugcadmin.sz.uae.uc.cn/1/opt/tags?size=20&page=1&status=1&biz_id=1014&scene_id=muggle',
  options: {
    headers: {
      cookie: '_UP_A4A_11_=wb70f14ffb614284bca2d08da7764ffc; cna=xa7EEzDn6hMCAWoLH4+DJX2E; Hm_lvt_c337010bc5a1154d2fb6741a4d77d226=1537262776,1537323101; __utma=228792728.655522095.1537262777.1537262777.1537323101.2; __utmz=228792728.1537262777.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); isg=BPHxrR4QDkktrqIMx-78-ea6FH2VuIkss0R7T9MG67jR-hFMGy51IJ97GI6cN_2I; _ABRA=TAirIDIZkbLs1mDaL2Han1GxXJPg99N9opLrQrpE5sl4ciyIu2DSyUvPvYKfI6QydA1MlfE2iVIuhfoWFcJtjZom16WxjWldtR3cVd7tU9e5JcS-EXARZAaMY2IJa1yyPfE-KxIclqdyt85TPnSDrg8O0hBPdcaUpH6V4YIfMw8FdhXs2Vrxn9nlQu9q69Nf; ugcVersion=V1.9.3'
    }
  }
})
  .then(res => {
    debugger;
  })
  .catch(e => {
    debugger;
  })
// BUC Server Error: [@{"content":"{\"errorMessage\":\"invalid ssoToken\",\"isSuccess\":\"false\"}","hasError":false}:fe4e19a235b14474b701e48e343faf000eecda10].
