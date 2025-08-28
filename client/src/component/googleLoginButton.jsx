// client/src/components/googleLoginButton.js

import React from 'react';

const GoogleLoginButton = () => {
  return (
    <a href="http://localhost:3002/api/auth/google">
      <button style={{ backgroundColor: '#4285F4', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
        Login with Google
      </button>
    </a>
  );
};

export default GoogleLoginButton;