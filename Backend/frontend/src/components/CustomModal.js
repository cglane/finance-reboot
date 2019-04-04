import React, { Component } from 'react';
import {Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios';
import $ from 'jquery'
import config from '../config'

class CustomModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log(props, 'props')
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {  
      show: true,
      email:'',
      name: '',
      phoneNumber: '',
      message: ''

    };
  }
  handleChange(event) {
    const target = event.target;
    const value = event.target.value
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  handleSubmit(event){
    event.preventDefault();
    let data = {
      email: this.state.email,
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      message: this.state.message,
      agentEmail: this.props.agent.email,
      streetAddress: this.props.streetAddress
    }
    console.log(data, 'data')
      axios.post(`${config.domain}/email`,  data)
      .then((res) => {
        console.log(res, 'res');
      }).catch((err)=> {
        console.log(err, 'err')
        alert('An error occured sending the email!')
      })
      
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Request for more Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form >
              <input 
                className="form-control form-control-lg" 
                type="text" 
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Name"/>
              <input 
                className="form-control form-control-lg" 
                type="email" 
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Email Address"/>
              <input 
                className="form-control form-control-lg" 
                type="text" 
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
                placeholder="Phone Number"/>

              <textarea className="form-control" 
                id="exampleFormControlTextarea1" 
                placeholder="Your Message...."
                name="message"
                value={this.state.message}
                onChange={this.handleChange}
                rows="3"></textarea>
              <button onClick={this.handleSubmit}>Submit</button>

            </form>

          </Modal.Body>
        </Modal>
        
      </>
    );
  }
}


export default CustomModal;