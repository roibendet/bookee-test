import React from 'react';

import io from 'socket.io-client'


export default class ChatMsgs extends React.Component {
  constructor() {
    super();
    this.state = {
      Msgs: []
    };

    this.userData = {
      userID: null,
      userMsg: null,

    };
    // this.socket = io(`http://localhost:3000`);

  }

  componentDidMount() {
    // bring data From server websocket
  }



  render() {

    return (<div>
      <ul>
<li>content</li>
      </ul>
    </div>)


  }

}