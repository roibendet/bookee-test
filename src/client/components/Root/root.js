import React from 'react';
import ChatBox from '../ChatBox/ChatBox';
import SignUp from '../Auth/Signup';
import SignIn from '../Auth/Signin';
import Weather from '../Weather/Weather';


import './root.css'


export default class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: null,
      signedIn: false,
      signMode: 'in',
      signError: false
    };
    this.signModeHandler = this.signModeHandler.bind(this);
    this.singInHandler = this.singInHandler.bind(this);
  }

  signModeHandler() {
    if (this.state.signMode === 'in') {
      return this.setState({signMode: 'up', signError: false})
    }
    if (this.state.signMode === 'up') {
      return this.setState({signMode: 'in', signError: false})
    }
  }

  singInHandler(res, email) {
    const username = email.slice(0, email.indexOf('@'));

    if (res === 'signin') {
      this.setState({signedIn: true, signMode: 'loggedin', userID: username})
    }
    if (res === 'error') {
      this.setState({signError: true})
    }

  }

  render() {

    return (

      <div className="row">


        <div className="col-md-6">
          <Weather/>
        </div>

        <div className="col-md-6 my-container-chat">
            {this.state.signMode === 'in' &&
         <SignIn signModeHandler={this.signModeHandler} singInHandler={this.singInHandler}/>}


         {this.state.signMode === 'up' &&
         <SignUp signModeHandler={this.signModeHandler} singInHandler={this.singInHandler}/>}


         {this.state.signedIn &&
         <ChatBox username={this.state.userID}/>}

         {this.state.signError &&
         this.state.signMode === 'in' &&
         <div className="errorMsg"> email/password are wrong</div>}

         {this.state.signError &&
         this.state.signMode === 'up' &&
         <div className="errorMsg"> user already existent</div>}
        </div>


      </div>
    )
  }
}

