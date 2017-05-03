import React from 'react'
import { connect } from 'react-redux'
import actions from '../../Redux/actions'
import Loading from '../../components/common/Loading'
import actionTypes from '../../Redux/actionTypes'
import createHistory from 'history/createHashHistory'
import { hideOptionMenu } from '../../middleWares/wxSDK'

const history = createHistory()

class AppInitialPage extends React.Component {
  componentWillMount() {
    this.props.fetchWxConfig()
  }

  componentWillReceiveProps(props) {
    const { isInitialSucceed: currentIsInitialSucceed } = this.props
    const { isInitialSucceed: nextIsInitialSucceed } = props
    if (!currentIsInitialSucceed && nextIsInitialSucceed) {
      hideOptionMenu()
      this.toHomePage()
    }
  }

  toHomePage = () => {
    history.replace('/waiqin/sign')
  }

  render () {
    const { errors } = this.props
    const wxConfigError = errors.find(e => e.errorType === actionTypes.RECEIVE_WX_CONFIG_FAILED)
    if (wxConfigError) {
      return (
        <ErrorMesg errorMesg={wxConfigError.errorMesg}/>
      )
    }
    return <Loading loadingText="应用初始化中..."/>
  }
}

const mapStateToProps = state => ({
  isWxConfigLoading: state.wx.isWxConfigLoading,
  isInitialSucceed: state.wx.isInitialSucceed,
  errors: state.wx.errors
})

const mapDispatchToProps = dispatch => ({
  fetchWxConfig: () => {
    dispatch(actions.fetchWxConfig())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppInitialPage)
