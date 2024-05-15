import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  CSidebarNav,
  CNavItem,
} from '@coreui/react';
import { cilAccountLogout } from '@coreui/icons'; // Corrected import
import CIcon from '@coreui/icons-react';

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const submitLogout = () => {
    // Clear user session or token here
    localStorage.removeItem('token'); // Example of clearing the token from localStorage
    // Redirect to login page
    navigate('/login');
  };

  const handleLogout = () => {
    console.log("Logging out");
    submitLogout();
  };
  const navigate = useNavigate();

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={50} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter style={{ cursor: 'pointer' }}>

            <CIcon icon={cilAccountLogout} height={20} onClick={handleLogout}/>
            <div onClick={handleLogout} style={{fontSize: 15 }}> Logout</div>


        <CSidebarToggler
          onClick={() => {
            dispatch({ type: 'set', sidebarUnfoldable: !unfoldable });
            setSidebarExpand(!sidebarExpand);
          }}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
