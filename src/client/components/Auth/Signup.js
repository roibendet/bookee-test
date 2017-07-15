import React from 'react';
import './auth.css';


export default class SignUp extends React.Component {
  constructor() {
    super();
    this.newUser = {
      username: null,
      password: null

    };
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {

    e.preventDefault();
    this.newUser = {
      username: e.target[0].value,
      password: e.target[1].value
    };

    const xhr = new XMLHttpRequest();
    xhr.open('post', `http://localhost:3000/CreateNewUser`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", () => {
      
      this.props.singInHandler(xhr.responseText, this.newUser.username);
    });

    xhr.send(JSON.stringify(this.newUser));
  }


  render() {

    return (

      <div className="auth">

        <h2 className="sign-title">Bookee Test</h2>

        <form className="sign-form" onSubmit={this.onSubmit}>

          <h4 className="sign-action-title">Create account</h4>

          <label htmlFor="username-input" className="sign-username">Email</label>
          <input id="username-input" className="sign-username-input" type="email" placeholder="E-mail"/>


          <label htmlFor="password-input" className="sign-password">Password</label>
          <input id="password-input" className="sign-username-input" type="password" placeholder="Password"/>

          <button className="sign-submit-btn" type="submit">Submit</button>

        </form>


        <div>

          <span className="sign-question">Already have an account ?</span>

          <button className="sign-btn" onClick={() => this.props.signModeHandler()} >Sign in</button>

        </div>
      </div>
    )
  }
}