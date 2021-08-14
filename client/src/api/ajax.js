import axios from 'axios'

/**
 * 封装ajax请求
 * 调用get和post请求(基于promise 和 axios)
 * @param url  请求路径
 * @param params 请求参数或请求数据
 * @param type 请求类型
 * @returns {Promise<any>}
 */
export default function ajax(url='', params={}, type='GET') {
    //1.定义promise对象
    let promise;
    return new Promise((resolve, reject)=>{
        //2.判断请求的方式
        if('GET'===type){
            //2.1 拼接请求的字符串
            let paramsStr= '';
            Object.keys(params).forEach( key=>{
                paramsStr += key + '=' + params[key] + '&';
            })
            //2.2 过滤最后的&
            if(paramsStr !== ''){
              // paramsStr= paramsStr.slice(0, paramsStr.length-1);
              paramsStr= paramsStr.substr(0, paramsStr.lastIndexOf('&'));
              //2.3 完整路径
              url += '?' + paramsStr
            }

            //2.4 发送get请求
            promise= axios.get(url);

        } else if('POST'===type){
          // 发送post请求
          promise= axios.post(url, params);
        }

        //3.返回请求结果
        promise.then(response=>{
          resolve(response.data)
        }).catch(error=>{
          reject(error)
        })

    })

}
