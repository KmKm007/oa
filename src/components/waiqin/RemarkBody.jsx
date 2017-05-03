import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'
import { FullButton } from '../../components/ui/button/index'

class RemarkBody extends React.Component {
  onConfirmClick = () => {
    this.props.handleConfirmClick(this.refs.remarkText.value)
  }

  render () {
    const { imageSrc, onImageClick, remarkText, remarkImageURL, removeWaiqinRemarkImage } = this.props
    return (
    <div className="container">
        <div className="remark-page-container">
          <div className="remark-photo-container">
            <img
              onClick={onImageClick}
              className="remark-photo-btn"
              src={imageSrc}
            />
          { remarkImageURL?
            <div className="remark-photo-re-container">
              <button className="remark-photo-re-btn" onClick={removeWaiqinRemarkImage}>重新上传</button>
            </div> : null
          }

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
            <FullButton onClick={this.onConfirmClick}>确&nbsp;&nbsp;定</FullButton>
          </div>
        </div>
      </div>
    )
  }
}

RemarkBody.propTypes = {
  remarkText: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired
}

export default RemarkBody
