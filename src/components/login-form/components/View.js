import React from 'react';
import { Redirect } from 'react-router-dom';
import '../style.scss';

const authenticationServer = 'http://localhost:9000/sessions';

const createUserSession = (username, password) => {
  return fetch(authenticationServer, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
  }).then(response => {
      if (response.ok) {
          return response.json();
      }
  });
};

export default ({onLogin, authentication}) => {
    const { token, reason } = authentication || {};
    return (
        <div className="login-form">
            {
                !token &&
                <div className="login-form__panel">
                    {reason && <span style={{color:'red'}}>{reason}</span>}
                    <div className="login-form__section">
                        <label htmlFor="username">Username:</label>
                        <input ref={(ref) => this.username = ref} id="username" />
                    </div>
                    <div className="login-form__section">
                        <label htmlFor="password">Password:</label>
                        <input ref={(ref) => this.password = ref} type="password" id="password" />
                    </div>
                    <button className="login-form__button" onClick={() => {
                        createUserSession(this.username.value, this.password.value).then(json => onLogin(json));
                    }}>OK</button>
                </div>
            }
            {
                token && <Redirect to="/classes" />
            }
        </div>
    );
}