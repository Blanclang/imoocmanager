//src/axios/index.js
//对jsonp的方法进行封装
import JsonP from "jsonp";//*导入jsonp的插件
import axios from 'axios';//*导入axios插件
import {Modal} from "antd";
//导出一个对象供其他对象进行使用
export default class Axios {
  static jsonp(options) {//定义静态的方法   jsonp  供其他页面进行使用
    return new Promise((resolve, reject) => {//使用Promise解决函数间的嵌套问题   链式调用
      JsonP(options.url, {
        param: 'callback'
      }, function (err, response) {
        //to-do
        //传入JsoP的对象进行操作
        //如果返回的对象是成功,使用resolve方法进行返回
        //debugger;//通过这个打断点
        if (response.status == 'success') {//成功后  用resolve返回数据
          resolve(response);
        } else {    //失败后用reject返回数据
          reject(response.message);
        }
      })
    })
  }

  static ajax(options) {//封装axios   定义为ajax请求,使用Promise
    const baseApi = 'https://easy-mock.com/mock/5c0893b83b84ee1919884836/mock.api';
    return new Promise((resolve,reject)=>{
      axios({
        url:options.url,
        method:'get',
        baseURL:baseApi,
        timeout:5000,
        params: (options.data && options.data.params) || ''
      }).then((response)=>{
        if (response.status == '200'){
          let res = response.data;
          if (res.code == '0'){
            resolve(res) ;
          }else{
            Modal.info({
              title:"提示",
              content:res.msg
            })
          }
        }else{
          reject(response.data);
        }
      })
    });
  }
}