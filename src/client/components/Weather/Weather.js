import React from 'react'
import ReactWeather from 'react-open-weather';
import cityNames from '../../assets/Cities/Cities';
// import 'react-open-weather/lib/css/ReactWeather.css';
import './Weather.css'


export default class ChatBox extends React.Component {
  constructor() {
    super();
    this.state = {
      cities: []
    };
    this.weatherElementBuilder = this.weatherElementBuilder.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.randomCity = this.randomCity.bind(this)
  }

  componentDidMount() {
    this.randomCity();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate() {
    if (this.state.cities.length < 4) {
      this.randomCity();
    }
  }


  randomCity() {
    let min = Math.ceil(0);
    let max = Math.floor(384);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    let newState = this.state.cities;
    newState.push(cityNames[randomNumber]);
    this.setState({cities: newState});
  }

  weatherElementBuilder() {
    const appID = 'dddeb1b3f5074cd899394818171507';
    return this.state.cities.map((city, i) => {
      return <div key={i}><ReactWeather
        className="reactWeather"
        forecast="today"
        apikey={appID}
        type="city"
        city={city}/></div>
    })
  }


  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset + 1;
    if (windowBottom >= docHeight) {
      this.randomCity();
    }
  }


  render() {

    return (
      <div className="container">
        <h1 className="title">Welcome to my App</h1>
        <div className="rw-main">
          {this.weatherElementBuilder()}
        </div>
      </div>

    )
  }
}

