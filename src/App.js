import Home from './components/common/Home';
import BookDetails from './components/books/BookDetails';
import BookCreate from './components/books/BookCreate'
import HeaderApp from './components/common/HeaderApp';
import FooterApp from './components/common/FooterApp';
import Register from './components/users/Register';
import Login from './components/users/Login';
import Profile from './components/users/Profile';
import Logout from './components/users/Logout'
import AuthProvider from './contexts/AuthContext';

import React from 'react';

import 'antd/dist/antd.css';

import { Routes, Route } from 'react-router-dom';

import { Layout } from 'antd';
const { Content } = Layout;

function App() {

	return (
		<AuthProvider>
			<Layout className="site-layout">
				<HeaderApp />
				<Content
					className="site-layout-background"
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
					}}
				>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/books/catalog/:category" element={<Home />} />
						<Route path="/books/create" element={<BookCreate />} />
						<Route path="/books/:bookId/details" element={<BookDetails />} />
						<Route path="/users/register" element={<Register />} />
						<Route path="/users/login" element={<Login />} />
						<Route path="/users/:userId/profile" element={<Profile />} />
						<Route path="/users/logout" element={<Logout />} />
					</Routes>

				</Content>
				<FooterApp />
			</Layout>

		</AuthProvider>
	);
}

export default App;
