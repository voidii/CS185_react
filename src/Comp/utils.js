import axios from 'axios';
const axiosRequester = () => {
  let cancel;
  return async url => {
    if(cancel) {
      //如果token存在，就取消请求
      cancel.cancel();
    }
    //创建一个新的cancelToken
    cancel = axios.CancelToken.source();    
    try {
      const res = await axios(url, {
         cancelToken: cancel.token
      })      
      const result = res.data.results;
      return result;
    } catch(error) {
      if(axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.log(error.message);
      }
    }
  }
}
export const _search = axiosRequester();