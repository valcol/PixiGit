import React, { Component, PropTypes } from 'react';

export default class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content:''
    };
  }

  onChange(e) {
    this.setState({ content: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handle(this.state.content);
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input onChange={this.onChange.bind(this)} value={this.state.content} />
        <button>{"load"}</button>
      </form>
    );
  }

}
