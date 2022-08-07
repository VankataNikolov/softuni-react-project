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
        const element = await screen.findAllByText('Login');
        expect(element[1]).toBeInTheDocument();
    });

    test('show Register button', async () => {
        const element = await screen.findAllByText('Register');
        expect(element[1]).toBeInTheDocument();
    });

    test('show Home button', async () => {
        const element = await screen.findAllByText('Home');
        expect(element[1]).toBeInTheDocument();
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

        const element = await screen.findAllByText('Profile');
        expect(element[1]).toBeInTheDocument();
    });

    test('show Create book button', async () => {

        const element = await screen.findAllByText('Create book');
        expect(element[1]).toBeInTheDocument();
    });

    test('show Logout button', async () => {

        const element = await screen.findAllByText('Logout');
        expect(element[1]).toBeInTheDocument();
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
