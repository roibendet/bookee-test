import './auth.css';
import React from 'react';


export default class SignIn extends React.Component {
  constructor() {
    super();

    this.user = {
      username: null,
      password: null
    };

    this.onSubmit = this.onSubmit.bind(this)
  }


  onSubmit(e) {
    e.preventDefault();
    this.user = {
      username: e.target[0].value,
      password: e.target[1].value
    };


    const xhr = new XMLHttpRequest();


    xhr.open('post', `http://localhost:3000/SignInWithThisUser`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("load", () => {
      this.props.singInHandler(xhr.responseText, this.user.username);
      // this.props.signModeHandler();

    });
    xhr.send(JSON.stringify(this.user));

  }

  componentDidMount() {
  }


  render() {


    return (

      <div className="auth">
        <i className="fa fa-mixcloud signup-logo"/>
        <h2 className="sign-title">Bookee Test</h2>


        <form className="sign-form" onSubmit={this.onSubmit}>
          <h4 className="sign-action-title">Sign In</h4>

          <label htmlFor="username-input" className="sign-username">Email</label>
          <input id="username-input" className="sign-username-input" type="email" placeholder="E-mail"/>

          <label htmlFor="password-input" className="sign-password">Password</label>
          <input id="password-input" className="sign-username-input" type="password" placeholder="Password"/>

          <button className="sign-submit-btn" type="submit">Submit</button>
        </form>


        <div>
          <span className="sign-question">Don't have an account yet ?</span>
          <button className="sign-btn" onClick={() => this.props.signModeHandler()}>Create Account</button>
        </div>


      </div>
    )
  }
}
