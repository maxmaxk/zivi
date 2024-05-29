/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/naming-convention */
let backend_address = window._env_.BACKEND_ADDRESS
if (!backend_address.endsWith('/')) {
  backend_address = backend_address + '/'
}

const config = {
  BACKEND_ADDRESS: backend_address,
  YMAPS_API: window._env_.YMAPS_API
}

export default config
