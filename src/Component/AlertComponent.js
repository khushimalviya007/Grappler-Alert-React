import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchAlerts } from '../Slices/AlertSlice';
import { useDispatch, useSelector } from 'react-redux';

const AlertComponent = () => {
  const [alerts, setAlerts] = useState([]);
  const dispatch = useDispatch();
  useEffect
  (() => {
    dispatch(fetchAlerts());
  }, []);

  const { Alert, isLoading, error } = useSelector((state) => state.Alert);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleAlertButtonClick = (alertId) => {
    // Perform an action when the button for a specific alert is clicked
    console.log(`Button clicked for alert with ID: ${alertId}`);
    // Add logic to handle the button action (e.g., acknowledge or dismiss the alert)
  };

  return (
    // <div>
    //   <h1>Alerts</h1>
    //   {Alert.map(alert => (
    //     <div key={alert.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
    //       <h3>Type: {alert.type}</h3>
    //       <p>Description: {alert.description}</p>
    //       <button onClick={() => handleAlertButtonClick(alert.id)}>Action</button>
    //     </div>  
    //   ))}
    // </div>
    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
        {Alert.map(alert => (
    <div className="toast-body" key={alert.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      Type: {alert.type}
      Description: {alert.description}
      <div className="mt-2 pt-2 border-top">
        <button type="button"onClick={() => handleAlertButtonClick(alert.id)}class="btn btn-primary btn-sm">Take action</button>
        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="toast">Close</button>
      </div>   
    </div>
       ))}
  </div>
  );
};

export default AlertComponent;
