import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import '../App.css';
import danger from './danger.png';
import { fetchAlerts } from "../Slices/AlertSlice";
import AlertComponent from "./AlertComponent";

function Alert() {
  const nevigate = useNavigate();
  const dispatch = useDispatch();

  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  useEffect
    (() => {
      dispatch(fetchAlerts());
      <AlertComponent />
    }, []);

  const { Alert, isLoading, error } = useSelector((state) => state.Alert);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <div id="Alert-container">
        <h2>My Alert</h2>
        <div id="alert-list">
          {Alert.map((item) => {
            let linkTo
            if (!item.projectId) {
              linkTo = `/users/tickets/${item.ticketId}`;
            }
            else if (item.projectId && item.ticketId) {
              linkTo = `/users/tickets/${item.ticketId}`;
            }
            else {
              linkTo = `/users/projects/${item.projectId}`;
            }
            return (
              <Link
                to={linkTo}
                className="alert-item"
                key={item.id}
              >
                <img src={danger} alt="Alert icon" className="icon" />
                <div className="items">
                  <strong>{item.type}</strong> {item.description}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Alert;