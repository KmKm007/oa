import React from 'react'
import PropTypes from 'prop-types'
import MenuHeaderContainer from '../MenuHeaderContainer'
import SignSucceedBody from '../../components/waiqin/SignSucceedBody'
import { parseToTimeObject } from '../../utils/DateUtil'

const SignSucceedContainer = ({ signTime, address }) => {
  const timeObject = parseToTimeObject(signTime)
  return (
    <div>
      <MenuHeaderContainer />
      <SignSucceedBody
        timeObject={timeObject}
        address={address}
      />
    </div>
  )
}

SignSucceedContainer.propTypes = {
  signTime: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired
}

export default SignSucceedContainer
