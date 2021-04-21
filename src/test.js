import {default as api} from "@/utils/api";
import qs from "qs";

let config = {
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}
// let param = new FormData()  // 创建form对象
// param.append('fileName', 'food2.jpeg')  // 通过append向form对象添加数据
// param.append('chunk', '0') // 添加form表单中其他数据
api({
  url: "/file/download",
  method: "post",
  data:qs.stringify({fileName:'food2.jpeg'}),
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  responseType: 'blob'
}).then(data => {
  console.log('file',data)
}).catch(err => {
  console.log(err);
})
