import React, { PropTypes } from 'react'

class RemarkPage extends React.Component {
  componentWillMount() {
    document.title = {this.props.title}
  }

  static defaultProps = {
    title: '添加备注'
  }

  static propTypes = {
    remarkText: PropTypes.string.isRequired,
    remarkURL: PropTypes.string.isRequire
  }

  render () {
    return (
      <div className="container">
        <header>添加签到文字描述</header>
        <div>
          <textarea placeholder="点击输入哦~"/>
        </div>
        <div>
          <button>确定</button>
        </div>
      </div>
    )
  }
}

const styles = {

}

export default RemarkPage
