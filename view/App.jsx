import React, { Component } from 'react';
import {render} from 'react-dom';

import Grid from './Grid.jsx';
import Form from './Form.jsx';

import css from './App.less';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.isMouseDown = true;
    let numberOfYears = 2;
    let weeksToRender = 52*2;
    let activityArray = [];
    for (let i=0;i<weeksToRender;i++){
      let weeks = [];
      for (let j=0;j<7;j++)
        weeks.push(0);
      activityArray.push(weeks);
    }
    this.state = {
        activityArray,
        numberOfYears,
        selectedColor:0
    };
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.mouseDown.bind(this));
    window.addEventListener('mouseup', this.mouseUp.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.mouseDown.bind(this));
    window.removeEventListener('mouseup', this.mouseUp.bind(this));
  }

  mouseDown(){
    this.isMouseDown = true;
  }

  mouseUp(){
    this.isMouseDown = false;
  }

  handleChanges(weekIndex, dayIndex, bool){
    if (this.isMouseDown || bool){
      let activityArray = this.state.activityArray;
      activityArray[weekIndex][dayIndex] = this.state.selectedColor;
      this.setState({activityArray});
    }
  }

  changeColor(selectedColor){
    this.setState({selectedColor});
  }

  resetActivityArray(){
    let weeksToRender = 52*this.state.numberOfYears;
    let activityArray = [];
    for (let i=0;i<weeksToRender;i++){
      let weeks = [];
      for (let j=0;j<7;j++)
        weeks.push(0);
      activityArray.push(weeks);
    }
    this.setState({activityArray});
  }

  handleClick(){
   this.resetActivityArray();
  }

  handleForm(content){
    fetch('/getgit/'+content)
    .then(function(response) {
      return response.json();
    })
    .then((response) => {
      let activityArray = [];
      for (let i=0;i<52*this.state.numberOfYears;i++){
        let weeks = [];
        for (let j=0;j<7;j++){
          let qb = response.quartileBoundaries;
          let value = response.contributions[(i*7)+j];
          if (value < 1)
            weeks.push(0);
          else if (value <= qb[0])
            weeks.push(1);
          else if (value <= qb[1])
            weeks.push(2);
          else if (value <= qb[2])
            weeks.push(3);
          else if (value > qb[2])
            weeks.push(4);
          else
            weeks.push(0);
        }
        activityArray.push(weeks);
      }
      this.setState({activityArray});
    })
  }

  render() {
    return (
      <div className="container">
          <Form handle={this.handleForm.bind(this)}/>
          <button onClickCapture={this.changeColor.bind(this, 0)}>{'Color 0'}</button>
          <button onClickCapture={this.changeColor.bind(this, 1)}>{'Color 1'}</button>
          <button onClickCapture={this.changeColor.bind(this, 2)}>{'Color 2'}</button>
          <button onClickCapture={this.changeColor.bind(this, 3)}>{'Color 3'}</button>
          <button onClickCapture={this.changeColor.bind(this, 4)}>{'Color 4'}</button>
          <Grid grid={this.state.activityArray} onChange={this.handleChanges.bind(this)} />
          <button onClickCapture={this.handleClick.bind(this)}>{'Reset'}</button>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
