import React, { Component } from 'react';
import {Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios';
import $ from 'jquery'
import config from '../config'

class ConfirmationModal extends React.Component {
  constructor(props, context) {
    super(props, context);
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

  render() {
    return (
      <>    
        <i className="material-icons" onClick={this.handleShow}>
            message
        </i>
        <Modal className="modal-form " show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Request for more Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Thank You For Your Request. We will follow up shortly.</h3>
          </Modal.Body>
        </Modal>
        
      </>
    );
  }
}


export default ConfirmationModal;