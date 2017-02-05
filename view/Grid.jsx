import React, { Component, PropTypes } from 'react';

export default class Grid extends Component {

  constructor(props) {
    super(props);
  }

  renderDay(week, weekIndex){
    return week.map((day, dayIndex) => (
      <div
        id={'day'+((weekIndex*7)+dayIndex)}
        className={'day level'+day}
        key={'day'+((weekIndex*7)+dayIndex)}
        onMouseOverCapture={this.handleClick.bind(this, weekIndex, dayIndex,  false)}
        onClick={this.handleClick.bind(this, weekIndex, dayIndex,  true)}
      >
      </div>
    ));
  }

  handleClick(weekIndex, dayIndex, bool){
      this.props.onChange(weekIndex, dayIndex, bool);
  }

  renderWeek(){
    return this.props.grid.map((week, weekIndex) => (
      <div id={'week'+weekIndex} className="week" key={'week'+weekIndex}>
        {this.renderDay(week, weekIndex)}
      </div>
    ));
  }

  render() {
    return (
      <div id="grid_container">
		      <div id="week_container">
            {this.renderWeek()}
      </div>
    </div>
    );
  }
}
