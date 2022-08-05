import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

import { Layout, Menu } from 'antd';
const { Header } = Layout;

function HeaderApp() {

    const { isAuthenticated, user } = useContext(AuthContext);

    const items = [
        {
            key: 'home',
            label: <Link to="/">Home</Link>,
        },
        !isAuthenticated ?{
            key: 'login',
            label: <Link to="/users/login">Login</Link>,
        } : '',
        !isAuthenticated ?{
            key: 'register',
            label: <Link to="/users/register">Register</Link>,
        } : '',
        isAuthenticated ? {
            key: 'logout',
            label: <Link to="/users/logout">Logout</Link>,
        } : '',
        isAuthenticated ? {
            key: 'create book',
            label: <Link to="/books/create">Create book</Link>,
        } : '',
        isAuthenticated ? {
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