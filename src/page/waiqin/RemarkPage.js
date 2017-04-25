import React from 'react'
import { connect } from 'react-redux'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import createHistory from 'history/createHashHistory'
import cs from 'classnames'
import actions from '../../Redux/actions'


const history = createHistory()

class RemarkPage extends React.Component {
  componentWillMount() {
    document.title = this.props.title
  }

  static defaultProps = {
    title: '添加备注'
  }

  onConfirmClick = () => {
    const remarkText = this.refs.remarkText.value
    const remarkURL = ''
    this.props.handleSaveRemark(remarkText, remarkURL)
    history.replace('/waiqin/sign')
  }

  render () {
    const { remarkText, remarkURL, fetchRemarkImage } = this.props
    const imageSrc = remarkURL || require('../../images/addImage.png')
    const imageClickHandler = remarkURL ? () => {} : fetchRemarkImage
    return (
      <div className="container">
          <MenuHeaderContainer/>
          <div className="remark-page-container">
            <div className="remark-photo-container">
              <img
                className="remark-photo-btn"
                src={imageSrc}
                onClick={imageClickHandler}
              />
            </div>
            <div className="remark-text-container">
              <header className="remark-text-container-header">添加签到文字描述</header>
              <textarea
                className={cs('textarea-no-resize', 'remark-text-area')}
                placeholder="点击输入哦~"
                ref="remarkText"
                defaultValue={remarkText ? remarkText : ''}
              />
            </div>
            <div className="remark-btn-container">
              <button className="remark-confirm-btn" onClick={this.onConfirmClick}>确&nbsp;&nbsp;定</button>
            </div>
          </div>
      </div>
    )
  }
}

const stateToProps = state => ({
  remarkText: state.waiqin.remarkText,
  remarkURL: state.waiqin.remarkURL
})

const dispatchToProps = dispatch => ({
  handleSaveRemark: (remarkText, remarkURL) => dispatch(actions.saveWaiqinRemark(remarkText, remarkURL)),
  fetchRemarkImage: () => dispatch(actions.fetchWaiqinRemarkImage())
})

export default connect(stateToProps, dispatchToProps)(RemarkPage)
