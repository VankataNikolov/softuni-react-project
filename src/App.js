import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/common/Home';
import BookDetails from './components/books/BookDetails/BookDetails';
import BookCreate from './components/books/BookCreate'
import BookEdit from './components/books/BookEdit/BookEdit';
import HeaderApp from './components/common/HeaderApp/HeaderApp';
import FooterApp from './components/common/FooterApp/FooterApp';
import Register from './components/users/Register/Register';
import Login from './components/users/Login/Login';
import Profile from './components/users/Profile';
import Logout from './components/users/Logout'
import AuthProvider from './contexts/AuthContext';
import PrivateRoute from './components/common/PrivateRoute/PrivateRoute';

import 'antd/dist/antd.min.css';

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
						<Route element={<PrivateRoute />}>
							<Route path="/users/:userId/profile" element={<Profile />} />
							<Route path="/users/logout" element={<Logout />} />
							<Route path="/books/create" element={<BookCreate />} />
							<Route path="/books/:bookId/edit" element={<BookEdit />} />
						</Route>
						<Route path="/" element={<Home />} />
						<Route path="/books/catalog/:category" element={<Home />} />
						<Route path="/books/:bookId/details" element={<BookDetails />} />
						<Route path="/users/register" element={<Register />} />
						<Route path="/users/login" element={<Login />} />

					</Routes>

				</Content>
				<FooterApp />
			</Layout>

		</AuthProvider>
	);
}

export default App;
