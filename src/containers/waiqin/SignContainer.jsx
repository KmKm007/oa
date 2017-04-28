import React from 'react'
import PropTypes from 'prop-types'
import { getCurrentTimeObject } from '../../utils/DateUtil'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import Loading from '../../components/common/Loading'
import SignHeader from '../../components/waiqin/SignHeader'
import SignBody from '../../components/waiqin/SignBody'

class SignContainer extends React.Component {
  static propTypes = {
    address: PropTypes.string,
    onShowLocationClick: PropTypes.func.isRequired,
    onSignClick: PropTypes.func.isRequired
  }

  render () {
    const { onSignClick, onShowLocationClick, onSearchBtnClick,
            address } = this.props
    const content = address ? (
      <SignBody
        onSignClick={onSignClick}
        onShowLocationClick={onShowLocationClick}
        address={address}
      />
    ) : (
      <Loading loadingText="获取位置中..."/>
    )

    const currentTimeObject = getCurrentTimeObject()

    return (
      <div className="container">
        <MenuHeaderContainer
          rightLabel="查询"
          handleRightClick={onSearchBtnClick}
        />
        <SignHeader currentTimeObject={currentTimeObject}/>
        {content}
      </div>
    )
  }
}

export default SignContainer
