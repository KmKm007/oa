import React from 'react'
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/default-skin/default-skin.css'
import 'photoswipe/dist/photoswipe.css'

class PreViewer extends React.Component {

  componentDidMount() {
    var openPhotoSwipe = function() {
      var pswpElement = document.querySelectorAll('.pswp')[0]

      // build items array
      var items = [
        {
          src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
          w: 1800,
          h: 1000
        }
      ]

      var options = {
        history: false,
        focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        counterEl: false
      }

      var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)
      gallery.init()
    }

    openPhotoSwipe()

    document.getElementById('btn').onclick = openPhotoSwipe
  }
  render() {
    return (
      <div>
        <button id="btn">Open PhotoSwipe</button>

        <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">

          <div className="pswp__bg"></div>

          <div className="pswp__scroll-wrap">

            <div className="pswp__container">
              <div className="pswp__item"></div>
              <div className="pswp__item"></div>
              <div className="pswp__item"></div>
            </div>

            <div className="pswp__ui pswp__ui--hidden">

              <div className="pswp__top-bar">

                <div className="pswp__counter"></div>

                <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <div className="pswp__preloader">
                  <div className="pswp__preloader__icn">
                    <div className="pswp__preloader__cut">
                      <div className="pswp__preloader__donut"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div className="pswp__share-tooltip"></div>
              </div>

              <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

              <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

              <div className="pswp__caption">
                <div className="pswp__caption__center"></div>
              </div>

            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default PreViewer
