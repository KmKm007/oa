import React, { PropTypes, Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class Alert extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  render () {
    const { handleClose, title, isShow } = this.props
    const actions = [
      <FlatButto
        label="取消"
        primary={true}
        onTouchTap= {handleClose}
      />
    ]
    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={isShow}
          onRequestClose={handleClose}
        >
          {title}
        </Dialog>
      </div>
    )
  }
}
