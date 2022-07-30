import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import { Layout, Menu } from 'antd';
const { Header } = Layout;

function HeaderApp() {

    const { isLoggedIn, user } = useContext(UserContext);

    const items = [
        {
            key: 'home',
            label: <Link to="/">Home</Link>,
        },
        {
            key: 'login',
            label: <Link to="/users/login">Login</Link>,
        },
        {
            key: 'register',
            label: <Link to="/users/register">Register</Link>,
        },
        isLoggedIn ? {
            key: 'logout',
            label: 'Logout',
        } : '',
        isLoggedIn ? {
            key: 'profile',
            label: <Link to={{ pathname: `/users/${user.userId}/profile` }}>Profile</Link>,
        } : '',

    ];
    return (
        <Header className="header">
            <Menu theme="dark" mode="horizontal" items={items} />
        </Header>
    );
}

export default HeaderApp;