// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isTrue: false,
      currentSeconds: 0,
      timer: 25,
    }
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.timerId)
  }

  incrementTimer = () => {
    this.setState(prevState => ({
      timer: prevState.timer + 1,
    }))
  }

  decrementTimer = () => {
    const {timer} = this.state
    if (timer > 1) {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }))
    }
  }

  buttonImgSection = () => {
    const {timer, currentSeconds} = this.state
    const disabledButton = currentSeconds > 0
    return (
      <div className="time-limit-container">
        <p className="timer-text">Set Timer limit</p>
        <div className="timer-limit-card">
          <button
            type="button"
            className="timer-btn"
            disabled={disabledButton}
            onClick={this.decrementTimer}
          >
            -
          </button>
          <div className="timer-limit-bg">
            <p className="timer-limit-sec">{timer}</p>
          </div>
          <button
            type="button"
            className="timer-btn"
            disabled={disabledButton}
            onClick={this.incrementTimer}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  resetTimer = () => {
    this.clearTimer()
    this.setState({isTrue: false, currentSeconds: 0, timer: 25})
  }

  startTimer = () => {
    const {timer, currentSeconds} = this.state
    const compareTimer = currentSeconds === timer * 60
    if (compareTimer) {
      this.clearTimer()
      this.setState({isTrue: false})
    } else {
      this.setState(prevState => ({
        currentSeconds: prevState.currentSeconds + 1,
      }))
    }
  }

  timerChange = () => {
    const {timer, currentSeconds, isTrue} = this.state
    const compareTimer = currentSeconds === timer * 60
    if (compareTimer) {
      this.setState({currentSeconds: 0})
    }
    if (isTrue) {
      this.clearTimer()
    } else {
      this.timerId = setInterval(this.startTimer, 1000)
    }
    this.setState(prevState => ({
      isTrue: !prevState.isTrue,
    }))
  }

  timerImageJsx = () => {
    const {isTrue} = this.state
    const imageChange = isTrue
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '

    return (
      <div className="timer-image-container">
        <button className="btn" type="button" onClick={this.timerChange}>
          <img
            src={imageChange}
            className="timer-img"
            alt={isTrue ? 'pause icon' : 'play icon'}
          />
          <p className="timer-text">{isTrue ? 'Pause' : 'Start'}</p>
        </button>
        <button className="btn" type="button" onClick={this.resetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
            className="timer-img"
            alt="reset icon"
          />
          <p className="timer-text">Reset</p>
        </button>
      </div>
    )
  }

  convertFormat = () => {
    const {timer, currentSeconds} = this.state
    const timerOperation = timer * 60 - currentSeconds
    const min = Math.floor(timerOperation / 60)
    const sec = Math.floor(timerOperation % 60)
    const minFormat = min > 9 ? min : `0${min}`
    const secFormat = sec > 9 ? sec : `0${sec}`
    return `${minFormat}:${secFormat}`
  }

  render() {
    const {isTrue} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="bgd-container">
          <div className="bgd-section">
            <div className="bgd-timer">
              <h1 className="time">{this.convertFormat()}</h1>
              <p className="bgd-text">{isTrue ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="timer-controller">
            {this.timerImageJsx()}
            {this.buttonImgSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
