import React from 'react'
import Swiper from 'swiper'

class Introduction extends React.Component {
  componentDidMount() {
    new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    })
  }
  render () {
    return (
      <div id="swiper-container" style={styles.container} className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            Slider 1
          </div>
          <div className="swiper-slide">
            Slider 2
          </div>
          <div className="swiper-slide">
            Slider 3
          </div>
          <div className="swiper-slide">
            Slider 4
          </div>
        </div>
        <div className="swiper-pagination">
        </div>
      </div>
    )
  }
}

const styles = {}

styles.container = {
  width: '100vw',
  height: '100vh'
}

export default Introduction
