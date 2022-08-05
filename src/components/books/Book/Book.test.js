import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Book from './Book';

const book = {
    _id: '123',
    title: 'header',
    author: 'Ivan',
    imageUrl: 'image url'
}

beforeEach(() => {
    render(
        <BrowserRouter>
            <Book book={book} />
        </BrowserRouter>
    );
});

describe('show book articles', () => {
    test('show book title', () => {
        const element = screen.getByText(book.title);
        expect(element).toBeInTheDocument();
    });

    test('show book author', () => {
        const element = screen.getByText(book.author);
        expect(element).toBeInTheDocument();
    });
});
