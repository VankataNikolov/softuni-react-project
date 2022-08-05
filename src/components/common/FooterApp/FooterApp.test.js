import { render, screen } from '@testing-library/react';
import FooterApp from './FooterApp';

const text = 'Created by Ivan Nikolov ©2022';

test('show footer text', () => {
    render(
        <FooterApp />
    );
    const element = screen.getByText(text);
    expect(element).toBeInTheDocument();
});