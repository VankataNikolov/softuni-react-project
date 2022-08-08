import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { AuthContext } from '../../../contexts/AuthContext';
import Register from './Register';

const userToRegister = {
    username: "vankata",
    password: "123456",
    confirmPassword: "123456"
}

const result = {
    username: "vankata",
    accessToken: "123",
    _id: "123"
}
const error = 'some error';
const resultWIthError = {
    message: error,
}

const emptyFieldErrorMessages = {
    username: 'Please input your username!',
    password: 'Please input your password!'
}

let originalFetch;

beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(
            userToRegister
        )
    }));
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

const logSpy = jest.spyOn(console, 'log');

const setUp = (authenticated, user) => {
    matchMediaSetup();
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ isAuthenticated: authenticated, user: user }}>
                <Register />
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

test('show register form fields', () => {
    setUp(false, {});
    const usernameField = screen.getByRole('textbox', {name: /username/i});
    expect(usernameField).toBeInTheDocument();

    const password = screen.getAllByRole('img', {name: /eye-invisible/i});
    expect(password[0]).toBeInTheDocument();
    expect(password[1]).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {name: /submit/i});
    expect(submitButton).toBeInTheDocument();
});

test('form should show proper messages for empty fields', async() => {
    setUp(false, {});

    const submitButton = screen.getByRole('button', {name: /submit/i});
    user.click(submitButton);

    await waitFor(() => {
        const element = screen.getByText(emptyFieldErrorMessages.username);
        expect(element).toBeInTheDocument();

        const elements = screen.getAllByText(emptyFieldErrorMessages.password);
        expect(elements[0]).toBeInTheDocument();
        expect(elements[1]).toBeInTheDocument();
    });

});