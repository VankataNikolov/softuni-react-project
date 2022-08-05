import { render, screen } from '@testing-library/react';
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

    test('show Login button', async () => {
        const element = await screen.findByText('Login');
        expect(element).toBeInTheDocument();
    });

    test('show Register button', async () => {
        const element = await screen.findByText('Register');
        expect(element).toBeInTheDocument();
    });

    test('show Home button', async () => {
        const element = await screen.findByText('Home');
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

    test('show Profile button', async () => {

        const element = await screen.findByText('Profile');
        expect(element).toBeInTheDocument();
    });

    test('show Create book button', async () => {

        const element = await screen.findByText('Create book');
        expect(element).toBeInTheDocument();
    });

    test('show Logout button', async () => {

        const element = await screen.findByText('Logout');
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
