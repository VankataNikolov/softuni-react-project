import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import HeaderApp from './HeaderApp';


describe('show / not show buttons for guest users', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ isAuthenticated: false, user: {} }}>
                    <HeaderApp />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    test('show Login button', () => {
        const element = screen.getByText('Login');
        expect(element).toBeInTheDocument();
    });

    test('show Register button', () => {
        const element = screen.getByText('Register');
        expect(element).toBeInTheDocument();
    });

    test('show Home button', () => {
        const element = screen.getByText('Home');
        expect(element).toBeInTheDocument();
    });

    test('don\'t show Profile button', () => {

        const element = screen.queryByText('Profile');
        expect(element).toBeNull;
    });

    test('don\'t show Create book button', () => {

        const element = screen.queryByText('Create book');
        expect(element).toBeNull;
    });

    test('don\'t show Logout button', () => {

        const element = screen.queryByText('Logout');
        expect(element).toBeNull;
    });

});

describe('show / not show buttons for authenticated users', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ isAuthenticated: true, user: {} }}>
                    <HeaderApp />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    test('show Profile button', () => {

        const element = screen.getByText('Profile');
        expect(element).toBeInTheDocument();
    });

    test('show Create book button', () => {

        const element = screen.getByText('Create book');
        expect(element).toBeInTheDocument();
    });

    test('show Logout button', () => {

        const element = screen.getByText('Logout');
        expect(element).toBeInTheDocument();
    });

    test('don\'t show Login button', () => {

        const element = screen.queryByText('Login');
        expect(element).toBeNull;
    });

    test('don\'t show Register button', () => {

        const element = screen.queryByText('Register');
        expect(element).toBeNull;
    });
})
