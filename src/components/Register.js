import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, ButtonGroup, Row } from 'react-bootstrap';
import AuthComponent from './AuthComponent';
import Header from '../containers/Header';
import Alert from '../components/Alert';
import * as consts from '../utils/const';
import '../styles/App.css';

const styles = StyleSheet.create({
});

class Register extends AuthComponent {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.gotoLogin = this.gotoLogin.bind(this);
  }

  showMessage(msg) {
    this.setState({
      errorMessage: msg,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.refs.username.value.trim() === '') {
      this.showMessage('Please enter your username.');
      return;
    } else if (this.refs.password.value.trim() === '') {
      this.showMessage('Please enter your password.');
      return;
     }else if (this.refs.password.value.trim() !== this.refs.confirmPassword.value.trim()) {
      this.showMessage('Passwords do not match.');
      return;
    }

    const credentials = {
      username: this.refs.username.value.trim(),
      password: this.refs.password.value.trim(),
    };
    this.props.register(credentials)
      .then(result => {
        if (result === 1) {
          this.props.history.push('/');
        } else {
          this.showMessage(result);
        }
      });
  }

  gotoLogin() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className='appContainer'>
        <Header details='Registration' />

        <Row className="justify-content-md-center">
          <h2>New User Registration</h2>
        </Row>

        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" required ref="username" />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required ref="password" />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" required ref="confirmPassword" />
          </Form.Group>
        </Form>

        <Row className="justify-content-md-center">
          <ButtonGroup vertical className="mt-3">
            <Button variant="primary" type="submit" onClick={this.onSubmit}>
              Register
            </Button>
            <Button variant="link" onClick={this.gotoLogin}>
              Login
            </Button>
          </ButtonGroup>
        </Row>

        <Alert variant='danger' message={this.state.errorMessage} />
      </div>
    );
  }
}

export default Register;