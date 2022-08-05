import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BookList from "./BookList";

const noBooksArr = [];

const oneBook = {
    _id: '123',
    title: 'title',
    author: 'author',
}
const booksArr = [
    oneBook
]

const noBooks = 'Няма книги в тази категория';

test(`show text ${noBooks}`, () => {
    render(
        <BrowserRouter>
            <BookList books={noBooksArr} />
        </BrowserRouter>
    );

    const element = screen.getByText(noBooks);
    expect(element).toBeInTheDocument();
});

const mockChildComponent = jest.fn();
jest.mock("../Book/Book", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});

test("If BookList is passed booksArr data, Book is called with prop book", () => {
    render(
        <BrowserRouter>
            <BookList books={booksArr} />
        </BrowserRouter>
    );
  expect(mockChildComponent).toHaveBeenCalledWith(
    expect.objectContaining({book: {...oneBook}})
  );
});
