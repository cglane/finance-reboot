import config from '../config'
import React, {Component} from 'react';


class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFlipped: false,
        dots: '.'
      };
      this.timer = this.timer.bind(this)
  }
  componentDidMount(){
    var intervalId = setInterval(this.timer, 1000);
    this.setState({intervalId});
    this.setState({dots: '.'})
  } 
  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
 }
  timer() {
    // setState method is used to update the state
    this.setState({dots: `${this.state.dots}.`});

 }
  render() {
      return(
        <div className="container-fluid loading-page text-center">
            <img src={config.brandImg}/>
            <h1> {`Loading${this.state.dots}`}</h1>
        </div>
      )
  }
}

export default Loading;


