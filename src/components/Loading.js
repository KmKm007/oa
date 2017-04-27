import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from 'material-ui/CircularProgress'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const style = {
  textAlign: 'center',
  marginTop: '50px'
}

const fullScreenStyle = {
  textAlign: 'center',
  paddingTop: '50px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh'
}

const overlayStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(10, 10, 10, 0.6)',
  opacity: 1.03,
  zIndex: 10000
}

class Loading extends React.Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)}
  }

  static defaultProps = {
    isFullScreen: false
  }

  static propTypes = {
    isFullScreen: PropTypes.bool
  }

  render () {
    const { loadingText, isFullScreen } = this.props
    return (
     <div style={ isFullScreen ? fullScreenStyle : style }>
       { isFullScreen ? <div style={overlayStyle}></div> : null }
       <div>
         <CircularProgress size={60} thickness={7} />
         <div>
           <span>{loadingText || 'loading...'}</span>
         </div>
       </div>
     </div>
    )
  }
}

Loading.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default Loading
