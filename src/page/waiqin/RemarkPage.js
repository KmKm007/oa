import React from 'react'
import { connect } from 'react-redux'
import createHistory from 'history/createHashHistory'
import actions from '../../Redux/actions'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import RemarkContainer from '../../containers/waiqin/RemarkContainer'

const history = createHistory()

class RemarkPage extends React.Component {
  componentWillMount() {
    document.title = this.props.title
  }

  static defaultProps = {
    title: '添加备注'
  }

  onConfirmClick = remarkText => {
    const remarkURL = this.props.remarkURL
    this.props.handleSaveRemark(remarkText, remarkURL)
    history.replace('/waiqin/sign')
  }

  render () {
    const { remarkText, remarkImageLocalId,
      fetchRemarkImage, remarkImageURL,
      userId, isUploadingImage, removeWaiqinRemarkImage } = this.props
    return (
      <div>
        <MenuHeaderContainer/>
        <RemarkContainer
          remarkText={remarkText}
          remarkImageLocalId={remarkImageLocalId}
          remarkImageURL={remarkImageURL}
          userId={userId}
          isUploadingImage={isUploadingImage}
          fetchRemarkImage={fetchRemarkImage}
          onConfirmClick={this.onConfirmClick}
          removeWaiqinRemarkImage={removeWaiqinRemarkImage}
        />
      </div>
    )
  }
}

const stateToProps = state => ({
  remarkText: state.waiqin.remarkText,
  remarkImageLocalId: state.waiqin.remarkImageLocalId,
  remarkImageURL: state.waiqin.remarkImageURL,
  userId: state.user.detail.userId,
  isUploadingImage: state.waiqin.isUploadingImage
})

const dispatchToProps = dispatch => ({
  handleSaveRemark: (remarkText, remarkURL) => dispatch(actions.saveWaiqinRemark(remarkText, remarkURL)),
  fetchRemarkImage: userId => dispatch(actions.fetchWaiqinRemarkImage(userId)),
  removeWaiqinRemarkImage: () => dispatch(actions.removeWaiqinRemarkImage())
})

export default connect(stateToProps, dispatchToProps)(RemarkPage)
