import { render, screen, waitFor, toBeVisible } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import BookDetails from './BookDetails';

const buttonNames = {
    like: "харесай",
    edit: "промени",
    delete: "изтрий",
    comment: "коментар"
}

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

const setUp = (authenticated, user) => {
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ isAuthenticated: authenticated, user: user }}>
                <BookDetails />
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

describe("Testing BookDetails component", () => {

    test('Should have proper book title after data fetch', async () => {

        setUp(false, {});

        const element = await screen.findByText(bookData.book.title);
        expect(element.textContent).toBe(bookData.book.title);
    });


    test('Should NOT have buttons for authenticated users', async () => {
        setUp(false, {});

        await waitFor(() => {
            const editBtn = screen.queryByText(buttonNames.edit);
            expect(editBtn).toBeNull;
        })

        await waitFor(() => {
            const deleteBtn = screen.queryByText(buttonNames.delete);
            expect(deleteBtn).toBeNull;
        })

        await waitFor(() => {
            const commentBtn = screen.queryByText(buttonNames.comment);
            expect(commentBtn).toBeNull;
        })

        await waitFor(() => {
            const likeBtn = screen.queryByText(buttonNames.like);
            expect(likeBtn).toBeNull;
        })

    });

    test('Should have buttons for authenticated users and not owners', async () => {
        setUp(true, notOwnerUser);

        await waitFor(() => {
            const editBtn = screen.queryByText(buttonNames.edit);
            expect(editBtn).toBeNull;
        });

        await waitFor(() => {
            const deleteBtn = screen.queryByText(buttonNames.delete);
            expect(deleteBtn).toBeNull;
        })

        await waitFor(() => {
            const commentBtn = screen.getByText(buttonNames.comment);
            expect(commentBtn).toBeVisible();
        });

        await waitFor(() => {
            const likeBtn = screen.getByText(buttonNames.like);
            expect(likeBtn).toBeVisible();
        });
    });

    test('show / not show buttons for owner user', async () => {
        setUp(true, ownerUser);

        await waitFor(() => {
            const editBtn = screen.getByText(buttonNames.edit);
            expect(editBtn).toBeVisible();
        });

        await waitFor(() => {
            const deleteBtn = screen.getByText(buttonNames.delete);
            expect(deleteBtn).toBeVisible();
        })

        await waitFor(() => {
            const commentBtn = screen.queryByText(buttonNames.comment);
            expect(commentBtn).toBeNull;
        });

        await waitFor(() => {
            const likeBtn = screen.queryByText(buttonNames.like);
            expect(likeBtn).toBeNull
        });
    })
});


