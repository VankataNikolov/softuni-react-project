import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'

import SideMenu from './SideMenu';
import Book from './Book';

import { Space } from 'antd';

function BookList() {
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(data => data.json())
            .then(booksData => setBooks(booksData));
    }, []);

    function changeCategoryHandler(category) {
        if (category == 'all') {
            fetch('http://localhost:5000/books')
                .then(data => data.json())
                .then(booksData => setBooks(booksData));
                
            navigate(`/`);
        } else {
            fetch(`http://localhost:5000/books/catalog/${category}`)
                .then(response => response.json())
                .then(bookData => setBooks(bookData));

            navigate(`/books/catalog/${category}`);
        }

    }

    return (
        <>
            <SideMenu changeCategory={changeCategoryHandler} />
            <Space
                direction="horizontal"
                size="large"
                style={{
                    display: 'flex',
                    marginTop: 20
                }}
            >
                {books.map(book => <Book key={book._id} book={book} />)}
            </Space>
        </>

    );
}

export default BookList;