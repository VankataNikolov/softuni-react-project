import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import BookDetails from './BookDetails';

const buttonNames = {
    like: "харесай",
    edit: "промени",
    delete: "изтрий",
    comment: "коментар"
}

const bookData = {
    "book": {
        "_id": "123",
        "title": "Пипи дългото чорапче (с цветни илюстрации)",
        "author": "Астрид Линдгрен",
        "category": "children",
        "description": "Скъпи приятели, При вас идва едно шведско момиче",
        "imageUrl": "https://i1.helikon.bg/products/0316/17/170316/170316z.jpg",
        "year": 2021,
        "created_at": "2022-07-23T12:44:46.665Z",
        "updated_at": "2022-08-03T14:45:07.755Z",
        "owner": {
            "_id": "456",
            "username": "vankata",
        },
        "likes": [],
        "comments": []
    },
    "commentsData": []
}

let originalFetch;

beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(
            bookData
        )
    }));
});

afterEach(() => {
    global.fetch = originalFetch;
});

describe("Testing BookDetails component", () => {

    test('Should have proper book title after data fetch', async () => {

        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ isAuthenticated: false, user: {} }}>
                    <BookDetails />
                </AuthContext.Provider>
            </BrowserRouter>
        );
        const element = await screen.findByText(bookData.book.title);
        expect(element.textContent).toBe(bookData.book.title);
    });


    test('Should NOT have buttons for authenticated users', async () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ isAuthenticated: false, user: {} }}>
                    <BookDetails />
                </AuthContext.Provider>
            </BrowserRouter>
        );

        const editBtn = screen.queryByText(buttonNames.edit);
        expect(editBtn).toBeNull;
        const deleteBtn = screen.queryByText(buttonNames.delete);
        expect(deleteBtn).toBeNull;
        const commentBtn = screen.queryByText(buttonNames.comment);
        expect(commentBtn).toBeNull;
        const likeBtn = screen.queryByText(buttonNames.like);
        expect(likeBtn).toBeNull;
    });
});


