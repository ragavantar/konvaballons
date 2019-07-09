import React, {Component} from 'react';
import './App.css';

import Ballon from './Ballon';
import Bg from './bg'

import { Stage, Layer, Text } from 'react-konva';

class App extends Component {
  state = { 
    score: 0,
    ballons: []
   }

  updateScore = points => {
    let {score} = this.state;
    score+=points;
    this.setState({score})
  }

  addBallon = (posX) => {
    return <Ballon posX={posX} updateScore={this.updateScore}/>
  }

  componentDidMount(){
    let count = 0;
    const timer = setInterval(() => {
      const posX = Math.floor(Math.random() * (window.innerWidth - 20)) + 20;  
      let {ballons} = this.state;
      // console.log(count)
      ballons.push(this.addBallon(posX));
      if(count++ < 10) this.setState({ballons});
      else clearInterval(timer);
    }, 2000);

    // let ballons = [];
    // for(let i=0; i< 10; i++){
    //   const posX = Math.floor(Math.random() * (window.innerWidth - 20)) + 20;  
    //   ballons.push(this.addBallon(posX, 500));
    // }
    // this.setState({ballons});
  }
  render() {
    const {score, ballons} = this.state; 
    // console.log(ballons)
    return ( 
      <Stage width={window.innerWidth} height={window.innerHeight}>
        
      <Bg />

      <Layer>   
        <Ballon posX={100} updateScore={this.updateScore}/>
        <Ballon posX={200} updateScore={this.updateScore}/>
        {ballons.map(e => e)}
        <Text 
        text={`Score : ${score}`}
        fontSize={25}
        /> 
      </Layer>

    </Stage>
     );
  }
}
 
export default App;
