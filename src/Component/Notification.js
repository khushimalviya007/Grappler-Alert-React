import { useEffect, useState } from "react";
import { DoLogout, getCurrentUserDetails } from "../Authentication";
import { formatDistanceToNow } from 'date-fns';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification } from "../Slices/NotificationSlice";
import '../App.css';
import bell from './bell.png';

function Notification() {
  const nevigate = useNavigate();
  const dispatch = useDispatch();

  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  useEffect(() => {
    dispatch(fetchNotification());
  }, []);
  const { Notification, isLoading, error } = useSelector((state) => state.Notification);

  console.log(Notification, "khushiiii");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <div id="notification-container">
        <h2>My Notifications</h2>
        <div id="notification-list">
          {Notification.map((item) => {
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
            const timeAgo = formatDistanceToNow(new Date(item.creationDate),{ addSuffix: true });
            return (
              <Link
                to={linkTo}
                className="notification-item"
                key={item.id}
              >
                <img src={bell} alt="Notification Bell" className="icon" />
                <div className="items">
                  <strong>{item.title}</strong> {item.description} <br></br>
                  <small>{timeAgo}</small>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Notification;