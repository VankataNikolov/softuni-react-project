import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import styles from './HeaderApp.module.css';

import { Layout, Menu } from 'antd';
const { Header } = Layout;

function HeaderApp() {

    const { isAuthenticated, user } = useContext(AuthContext);

    const guestUserButtons = (
        <>
            <NavLink to="/users/login" className={styles.link} >Login</NavLink>
            <NavLink to="/users/register" className={styles.link} >Register</NavLink>
        </>
    )

    const authenticatedUserButtons = (
        <>
            <NavLink to="/users/logout" className={styles.link} >Logout</NavLink>
            <NavLink to="/books/create" className={styles.link} >Create book</NavLink>
            <NavLink to={{ pathname: `/users/${user.userId}/profile` }} className={styles.link} >Profile</NavLink>
        </>
    )

    return (
        <Header className="header">
            <Menu theme="dark" mode="horizontal" >
                <div className={styles.topnav}>
                    <NavLink to="/" className={styles.link}>Home</NavLink>
                    {!isAuthenticated && guestUserButtons}
                    {isAuthenticated && authenticatedUserButtons}
                </div>
            </Menu>
        </Header>
    );
}

export default HeaderApp;