import React, { useEffect, useState } from 'react';
import Navbar from './Layout/Navbar';

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const clientId = '7444734b15c946bc92c85bba9e2319c0';
    const clientSecret = '9da97d099ac74d57bd05972bc1407d61';

    // The token endpoint URI
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const requestParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: 'grant_type=client_credentials',
    };

    // Send the POST request to the token endpoint
    fetch(tokenEndpoint, requestParameters)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const accessToken = data.access_token;
        setAccessToken(accessToken);
        console.log(accessToken);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <Navbar accessToken={accessToken} /> 
  );
}

export default App;
