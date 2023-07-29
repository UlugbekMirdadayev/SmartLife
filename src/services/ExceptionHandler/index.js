import { setJSExceptionHandler } from 'react-native-exception-handler'

const exceptionHandler = (e, isFatal) => {
  console.log(e, isFatal)
}

setJSExceptionHandler(exceptionHandler, true)
