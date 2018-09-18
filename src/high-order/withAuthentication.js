import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (WrappedComponent) => {
  const View = (props) => {
    const { authentication, ...rest } = props;
    const { token, expiredOn } = authentication || {};
    return (
      <div>

        {!token && <Redirect to="/login"/>}
        {token &&
          <div>
            <div>You session will be expired on: {expiredOn}</div>
            <WrappedComponent {...rest} />
          </div>
        }
      </div>
    );
  };

  return connect(({ authentication }) => ({
      authentication
  }))(View);
};