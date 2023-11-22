import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotification } from '../Slices/NotificationSlice';
import bell from './bell.png';
import danger from './danger.png';
import { DoLogout } from '../Authentication';
import { formatDistanceToNow } from 'date-fns';

const Navbar = () => {
  const { Notification } = useSelector((state) => state.Notification);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const nevigate = useNavigate();

  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
    setAlertVisible(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  
  const markAllAsRead = (notificationId) => {
    // Logic to mark all notifications as read using notificationId
    console.log(`Marking all as read for notification ID: ${notificationId}`);
  };
  return (
    <>
    
      <div className="navbar" style={{ alignItems: 'center' }}>
        <div className="logo">Innogent</div>
        <div className="notification-icon" style={{ marginLeft: '1000px' }}>
          <div>
            <img onClick={togglePopover} src={bell} alt="Notification" />
            {isPopoverVisible && (
              <div className="popover">
                <div className="notification-container">
                  {Notification.map((item) => (
                    <Link to="#" className="notification-item" key={item.id}>
                      <div className="notification-content">
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                        <small style={{ marginLeft: 'auto' }}>{formatDistanceToNow(new Date(item.creationDate), { addSuffix: true })}</small>
                      </div>
                    </Link>
                  ))}
                  <Link to="/users/notification" className="view-all">
                    View all notifications
                  </Link>
                  <Link  style={{ marginLeft: '50%' }} onClick={() => markAllAsRead(Notification.map((item) => item.id))} className="view-all">
                    Mark all as read
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <Link to="/users/alert" className="btn bd-primary" style={{ marginRight: '50px' }}>
          <img src={danger} alt="Alert" />
        </Link>
        <Link to="/users/rules" className="btn bd-primary" style={{ marginRight: '10px' }}>
          <button className="btn btn-warning">Rules</button>
        </Link>
        <button className="btn btn-warning" style={{ marginRight: '10px' }} onClick={() => {
          DoLogout(() => {
            nevigate("/signin");
          })
        }}>Logout</button>
      </div>
    </>
  );
};

export default Navbar;
