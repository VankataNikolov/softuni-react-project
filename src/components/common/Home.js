import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from "../books/SideMenu";
import BookList from '../books/BookList';

function Home() {
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(data => data.json())
            .then(booksData => setBooks(booksData));
    }, []);

    function changeCategoryHandler(category) {
        if (category === 'all') {
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
            <BookList books={books} />
        </>

    );
}

export default Home;