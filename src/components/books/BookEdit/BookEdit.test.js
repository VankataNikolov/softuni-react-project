import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import BookEdit from './BookEdit';

const notOwnerUser = {
    _id: "123",
    username: 'gosho'
}

const ownerUser = {
    _id: "456",
    username: 'vankata'
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

const matchMediaSetup = () => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }))
    })
}

const setUp = (authenticated, user) => {
    matchMediaSetup();
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ isAuthenticated: authenticated, user: user }}>
                <BookEdit />
            </AuthContext.Provider>
        </BrowserRouter>
    );
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

test('should load proper book info into form fields', async () => {

    setUp(true, ownerUser);

    await waitFor(() => {

        expect(screen.getByText((content, element) => element.value == bookData.book.title)).toBeInTheDocument();
        expect(screen.getByText((content, element) => element.value == bookData.book.description)).toBeInTheDocument();
        expect(screen.getByText((content, element) => element.value == bookData.book.author)).toBeInTheDocument();
        expect(screen.getByText((content, element) => element.value == bookData.book.year)).toBeInTheDocument();
        expect(screen.getByText((content, element) => element.value == bookData.book.imageUrl)).toBeInTheDocument();
        
    });

})