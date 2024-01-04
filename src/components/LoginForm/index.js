// Write your JS code here
import Popup from 'reactjs-popup'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {MdClose} from 'react-icons/md'
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
      <>
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
        <div className="note_container">
          <div>
            <Popup
              trigger={
                <button type="button" className="show_credentials_button">
                  Login Credentials
                </button>
              }
              className="pop_menu_content"
              modal
            >
              {close => (
                <div className="note_bg_container">
                  <button
                    type="button"
                    onClick={() => close()}
                    aria-label="close_button"
                    className="close_button"
                  >
                    <MdClose size={25} color="#ffffff" />
                  </button>
                  <div className="note_container">
                    <h1 className="note_heading">Note:</h1>
                    <p className="note_text">
                      To practice authentication and authorization, i used login
                      api from nxtwave company . So to test this application
                    </p>
                    <p className="note_text">username : rahul</p>
                    <p className="note_text">password : rahul@2021</p>
                    <p className="note_text thankyou_text">
                      Thanks for visiting
                    </p>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </>
    )
  }
}
export default LoginForm
