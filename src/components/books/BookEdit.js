import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookCreate from './BookCreate';


function BookEdit() {

    const { bookId } = useParams();

    const [book, setBook] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/books/${bookId}`)
        .then(response => response.json())
        .then(bookData => {
            setBook(bookData.book);
        });
    }, [bookId])

    return (
        <BookCreate book={book} />
    );
}

export default BookEdit;