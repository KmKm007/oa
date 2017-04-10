import React from 'react'
import Introduction from '../../containers/Introduction'
import '../../styles/swiper.min.css'

class WaiqinIntroductionPage extends React.Component {
  componentWillMount() {
    document.title = '外勤功能介绍'
  }

  render() {
    return (
      <Introduction />
    )
  }
}

export default WaiqinIntroductionPage
