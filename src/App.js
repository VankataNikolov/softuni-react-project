import BookList from './components/books/BookList';
import BookDetails from './components/books/BookDetails';
import HeaderApp from './components/common/HeaderApp';
import FooterApp from './components/common/FooterApp';
import Login from './components/users/Login';
import Profile from './components/users/Profile';
import { UserContext } from './contexts/UserContext';

import React, { useState } from 'react';

import 'antd/dist/antd.css';

import { Routes, Route } from 'react-router-dom';

import { Layout } from 'antd';
const { Content } = Layout;


function App() {

	const [user, setUser] = useState({
		username: '',
		accessToken: '',
		userId: ''
	});
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	function userSetter(user) {
		setUser(user);
		if (user.username) {
			setIsLoggedIn(true);
		}
	}

	return (
		<UserContext.Provider value={{ user, userSetter, isLoggedIn }}>

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
						<Route path="/" element={<BookList />} />
						<Route path="/books/catalog/:category" element={<BookList />} />
						<Route path="/books/:bookId/details" element={<BookDetails />} />
						<Route path="/users/login" element={<Login />} />
						<Route path="/users/:userId/profile" element={<Profile />} />
					</Routes>

				</Content>
				<FooterApp />
			</Layout>

		</UserContext.Provider>
	);
}

export default App;
