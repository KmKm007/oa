import React from 'react'
import ListChildUserHeader from '../../components/waiqin/ListChildUserHeader'
import ListChildUserBody from '../../components/waiqin/ListChildUserBody'
import ErrorMesg from '../../components/common/ErrorMesg'
import Loading from '../../components/common/Loading'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import actionTypes from '../../Redux/actionTypes'

const ListChildUserContainer = ({ userDetail, children, errors, handleUserClick }) => {
  const errorObject = errors.find(error => error.errorType === actionTypes.RECEIVE_USER_CHILDREN_FAILED)
  let content
  if (children) {
    content = <ListChildUserBody children={children} onUserClick={handleUserClick} />
  } else if (errorObject) {
    content = <ErrorMesg errorMesg={errorObject.errorMesg}/>
  } else {
    content = <Loading loadingText="获取下属列表中..."/>
  }
  return (
    <div>
      <MenuHeaderContainer/>
      <ListChildUserHeader userDetail={userDetail} onUserClick={handleUserClick}/>
      {content}
    </div>
  )
}

export default ListChildUserContainer
