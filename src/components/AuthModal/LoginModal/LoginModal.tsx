import './LoginModal.scss';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import closeIcon from '../../../img/icons/closeIcon.png';

export default function LoginModal({ isOpen, onClose, login }: any) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleEmailChange = (e: any) => {
    setEmailField(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPasswordField(e.target.value);
  };

  const onLogin = () => {
    login({
      email: emailField,
      password: passwordField
    });
  };

  return ReactDOM.createPortal(
    isOpen && (
      <div className="modal-root">
        <div className="login-modal">
          <div className="close-block">
            <IconButton
              className="close-icon"
              onClick={() => {
                onClose();
              }}>
              <img src={closeIcon} alt="" />
            </IconButton>
          </div>
          <div className="field-area">
            <div className="login-header">Log in</div>
            <div className="login-msg">Enter your email and password</div>
            <div className="login-field">
              <TextField
                value={emailField}
                onChange={handleEmailChange}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="small"
              />
            </div>
            <div className="password-field">
              <TextField
                value={passwordField}
                onChange={handlePasswordChange}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
              />
            </div>
            <Button
              className="login-btn"
              onClick={() => {
                onClose();
                onLogin();
              }}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    ),
    document.getElementById('portal-root')!
  );
}
