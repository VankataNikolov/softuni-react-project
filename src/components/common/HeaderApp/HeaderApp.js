import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import styles from './HeaderApp.module.css';

import { Layout, Menu } from 'antd';
const { Header } = Layout;

function HeaderApp() {

    const { isAuthenticated, user } = useContext(AuthContext);

    const navLinkStyle = ({ isActive }) => (isActive ? styles.active : styles.inactive);

    const guestUserButtons = (
        <>
            <NavLink to="/users/login" className={navLinkStyle} >Login</NavLink>
            <NavLink to="/users/register" className={navLinkStyle} >Register</NavLink>
        </>
    )

    const authenticatedUserButtons = (
        <>
            <NavLink to="/users/logout" className={navLinkStyle} >Logout</NavLink>
            <NavLink to="/books/create" className={navLinkStyle} >Create book</NavLink>
            <NavLink to={{ pathname: `/users/${user.userId}/profile` }} className={navLinkStyle} >Profile</NavLink>
        </>
    )

    return (
        <Header className="header">
            <Menu theme="dark" mode="horizontal" >
                <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                {!isAuthenticated && guestUserButtons}
                {isAuthenticated && authenticatedUserButtons}
            </Menu>
        </Header>
    );
}

export default HeaderApp;