import configs from '../config'
import { Buffer } from 'buffer';
global.Buffer = Buffer;

 

// const hash = new Buffer(`${'pp_szamlogin'}:${'pp_szampassword'}`).toString('base64')
const staticsBaseURL = 'http://example.com';
const hash = new Buffer(`${'mijoz_madad_u'}:${'123Mad@Qz45'}`).toString('base64')

export default {
  staticsBaseURL,

  apisauce: {
    baseURL: configs.API_ROOT,

    headers: {
      'Authorization': `Basic ${hash}`,
      // 'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data'
    }
  }
}
