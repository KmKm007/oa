import React from 'react'
import PropTypes from 'prop-types'
import { previewImage } from '../../middleWares/wxSDK'
import Loading from '../../components/common/Loading'
import RemarkBody from '../../components/waiqin/RemarkBody'


const RemarkContainer = ({ remarkText, remarkImageLocalId,
  remarkImageURL, userId, isUploadingImage,
  fetchRemarkImage, onConfirmClick, removeWaiqinRemarkImage }) => {
  const imageSrc = remarkImageLocalId || require('../../images/addImage.png')
  const imageClickHandler = remarkImageLocalId ? () => previewImage(remarkImageURL) : () => fetchRemarkImage(userId)
  return (
    <div>
      <RemarkBody
        remarkText={remarkText}
        imageSrc={imageSrc}
        remarkImageURL={remarkImageURL}
        userId={userId}
        onImageClick={imageClickHandler}
        handleConfirmClick={onConfirmClick}
        removeWaiqinRemarkImage={removeWaiqinRemarkImage}
      />
      { isUploadingImage ? <Loading isFullScreen={true} loadingText={'图片上传中...'}/> : null }
    </div>
  )
}

RemarkContainer.propTypes = {
  remarkText: PropTypes.string,
  userId: PropTypes.string.isRequired
}

export default RemarkContainer
