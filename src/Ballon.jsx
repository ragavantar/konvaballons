import React, { Component } from 'react';
import { Ellipse, Group, Text } from 'react-konva';
import Konva from 'konva';

 
class Ballon extends Component {
  constructor(props){
    super(props);
    this.state = {
      color: Konva.Util.getRandomColor()
    };
  }
  componentDidMount(){
    // console.log(this.ballon)
    // let y = this.props.posY;
    // setInterval(() => {
    //   console.log(y)
    //   y-=100;
    //   if(y < -100)y = this.props.posY;
    //   this.ballon.to({
    //     y: y - 100
    //   });
    //   this.text.to({
    //     y: y - 100
    //   });
    // }, 500);
   

    // const tween = Konva.Tween({

    // })
    this.animateUp();
  }

  animateUp = ()=>{
    this.group.to({
      y: 100,
      duration: 3,
      onFinish: () => this.resetBallon()
    })
  }

  resetBallon = () => {
    // console.log('reset')
    this.text.hide();
    this.ballon.hide();
    setTimeout(() => {
    this.group.to({
      y: window.innerHeight,
      onFinish: ()=>{
        this.text.show();
        // this.ballon.show();
        this.ballon.to({
          opacity: 1
        })
        this.ballon.show();
        this.animateUp();
      }
    });
    }, 2000); 
  }
  burst = new Audio('./burst.mp3');
  handleClick = () => {
    
    this.burst.play();
    this.ballon.to({
      // opacity: 0,
      opacity: false,
      duration: 0.5,
      onFinish: () => this.text.hide()
    })
    this.props.updateScore(10);
  };
  render() {
    const {posX} = this.props;
    const {color} = this.state;

    return (
      <Group
      ref={node => {
        this.group=node;
      }}
      x={0}
      y={window.innerHeight}
      >

        <Text 
          ref={node => {
            this.text = node;
            }}
          text="10+"
          fontSize={15}
          x={posX - 15}
          y={- 10}
        />
        
        <Ellipse
          ref={node => {
            this.ballon = node;
          }}
          x={posX}
          y={0}
          radiusX={40}
          radiusY={50}
          // fill={this.state.color}
          stroke="black"
          strokeWidth={1.5}
          shadowBlur={5}
          fillLinearGradientStartPoint={{ x: -100, y: -20 }}
          fillLinearGradientEndPoint={{ x: 2, y: 60 }}
          fillLinearGradientColorStops={[0, '#828080', 0.7, color]}
          visible={true}
          onClick={() => this.handleClick()}
          onTap={()=>this.handleClick()}
          />
          {/* <Wedge
            x={200}
            y={200 + 50}
            radius={10}
            angle={60}
            fill= {color}
            stroke= 'black'
            strokeWidth= {1.5}
            shadowBlur={5}
            rotation= {60}
          /> */}

        </Group>
    );
  }
}
 

export default Ballon;
