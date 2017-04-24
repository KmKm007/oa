import * as waiqinActions from './waiqinActions'
import * as userActions from './userActions'
import * as wxActions from './wxActions'
const actions = {
  ...waiqinActions,
  ...userActions,
  ...wxActions
}

export default actions
