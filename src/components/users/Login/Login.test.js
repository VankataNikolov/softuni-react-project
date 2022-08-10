import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { AuthContext } from '../../../contexts/AuthContext';
import Login from './Login';

const userLogin = jest.fn()
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

const userToLogin = {
    username: 'vankata',
    password: '123456'
}
const result = {
    username: "vankata",
    accessToken: "123",
    _id: "123"
}

let originalFetch;

beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(
            result
        )
    }));

    mockedUsedNavigate.mockReset();
});

afterEach(() => {
    global.fetch = originalFetch;
});

const matchMediaSetup = () => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
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
            <AuthContext.Provider value={{ isAuthenticated: authenticated, user: user, userLogin: userLogin }}>
                <Login />
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

test('show login form fields', () => {
    setUp(false, {});
    const usernameField = screen.getByRole('textbox', { name: /username/i });
    expect(usernameField).toBeInTheDocument();

    const password = screen.getByRole('img', { name: /eye-invisible/i });
    expect(password).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
});

test('proper navigate after success login', async () => {
    setUp(false, {});

    const usernameField = screen.getByRole('textbox', { name: /username/i });
    user.type(usernameField, userToLogin.username);

    const password = screen.getAllByRole('img', { name: /eye-invisible/i });
    user.type(password[0], userToLogin.password);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    user.click(submitButton);

    await waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/', {replace: true});
    });

});