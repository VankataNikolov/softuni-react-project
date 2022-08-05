import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import BookList from '../books/BookList/BookList';

import * as userService from '../../services/userService'

import { Tabs } from 'antd';
const { TabPane } = Tabs;

function Profile() {

    const [myBooks, setMyBooks] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);

    const { user } = useContext(AuthContext);
    const userId = user._id;
    const accessToken = user.accessToken;

    useEffect(() => {
        userService.getMyStuff(userId, accessToken)
            .then(res => res.json())
            .then(data => {
                setMyBooks(data.books);
                setLikedBooks(data.likedBooks);
            })
    }, [userId, accessToken])

    return (
        <Tabs defaultActiveKey="1" centered>
            <TabPane tab="моите книги" key="1">
                <BookList books={myBooks} />
            </TabPane>
            <TabPane tab="харесани книги" key="2">
                <BookList books={likedBooks} />
            </TabPane>
        </Tabs>
    );
}

export default Profile;