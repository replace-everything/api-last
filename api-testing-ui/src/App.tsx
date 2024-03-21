import React, { useState, useEffect } from 'react';
import axios from 'axios';

const routes = [
  'http://localhost:3000/local/users',
  'http://localhost:3000/local/users/with-leads',
  'http://localhost:3000/local/leads',
  'http://localhost:3000/local/invoices',
  'http://localhost:3000/local/clients',
  'http://localhost:3000/local/photos',
  'http://localhost:3000/local/inspections',
  'http://localhost:3000/local/events',
  'http://localhost:3000/local/tasks',
  'http://localhost:3000/local/upload-photo'
];

const App: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [responseData, setResponseData] = useState<any>(null);


  const handleRouteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoute(event.target.value);
  };

  const handleGetRequest = () => {
    axios.get(selectedRoute)
      .then(response => {
        setResponseData(response.data);
      })
      .catch(error => {
        console.error('Error performing GET request:', error);
      });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      // Replace '/upload' with the actual endpoint for file upload
      axios.post('http://localhost:3000/local/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log('File uploaded successfully:', response);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    }
  };

  return (
    <div>
      <select value={selectedRoute} onChange={handleRouteChange}>
        <option value="">Select a route</option>
        {routes.map(route => (
          <option key={route} value={route}>{route}</option>
        ))}
      </select>
      <button onClick={handleGetRequest}>Perform GET request</button>
      {responseData && (
        <div>
          <h2>Response Data:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default App;