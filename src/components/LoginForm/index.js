// Write your JS code here
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    errState: false,
  }

  loginSuccess = token => {
    const {history} = this.props
    console.log('token:', token)
    Cookies.set('jwt_token', token, {expires: 1})
    history.replace('/')
  }

  loginFailed = errMsg => {
    console.log('Login Failed')
    this.setState({
      errState: true,
      errorMsg: `*${errMsg}`,
    })
  }

  onClickFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state

    this.setState({
      errState: false,
      errorMsg: '',
    })
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailed(data.error_msg)
    }
  }

  updateUserName = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errState, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_route_bg_container">
        <div className="login_card_container">
          <div className="logo_img_container_sm">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              className="logo_img_element"
              alt="website logo"
            />
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="website login"
            className="login_img_element"
          />
          <form className="login_container" onSubmit={this.onClickFormSubmit}>
            <div className="img_container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                className="logo_img_element"
                alt="website logo"
              />
            </div>
            <div className="username_container">
              <label htmlFor="username" className="label_element">
                USERNAME
              </label>
              <input
                className="input_element"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={this.updateUserName}
              />
            </div>
            <div className="password_container">
              <label htmlFor="password" className="label_element">
                PASSWORD
              </label>
              <input
                className="input_element"
                id="password"
                type="password"
                placeholder="Password"
                onChange={this.updatePassword}
                value={password}
              />
            </div>
            <div className="button_container">
              <button className="login_button_element" type="submit">
                Login
              </button>
              {errState ? <p className="err_msg">{errorMsg}</p> : null}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
