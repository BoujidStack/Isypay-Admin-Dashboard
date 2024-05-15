import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons';
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef();
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationDetails, setShowNotificationDetails] = useState(false);

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  // Fetch notifications
  useEffect(() => {
    // Fetch notifications from your API
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://api.staging.k8s.isypay.net/api/user-notifications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your authorization token
        },
      });
      const data = await response.json();
      setNotifications(data);
      const unread = data.filter(notification => !notification.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Display notification details
  const handleNotificationClick = () => {
    setShowNotificationDetails(!showNotificationDetails);
    setUnreadCount(0); // Mark all notifications as read when clicked
  };
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZoneName: 'short'
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getNotificationTitleColor = (title) => {
    if (title === 'Confirmation de dépôt') {
      return '#3399ff';
    } else if (title === 'Confirmation de retrait') {
      return '#14de94';
    } else {
      return 'red';
    }
  };
  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#" onClick={handleNotificationClick} className="position-relative">
              {unreadCount > 0 && (
                <span className="badge bg-danger rounded-circle" style={{ position: 'absolute', top: '-8px', right: '-8px' }}>
                  {unreadCount}
                </span>
              )}
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      {/* Display notification details */}
      {showNotificationDetails && (
        <CContainer className="px-4" fluid style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
          <div style={{ padding: '1rem' }}>
            {notifications.map((notification, index) => (
              <div key={index} style={{ padding: '0.5rem 0', borderBottom: '1px solid #dee2e6' }}>
                <h5 style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: getNotificationTitleColor(notification.title) }}>
                  {notification.title}
                </h5>
                <p style={{ marginBottom: '0.25rem' }}>{notification.message}</p>
                <p style={{ fontSize: '0.85rem', color: '#6c757d' }}>{formatDate(notification.dateSent)}</p>
              </div>
            ))}
          </div>
        </CContainer>
      )}

    </CHeader>
  );
};

export default AppHeader;
