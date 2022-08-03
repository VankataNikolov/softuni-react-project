import Book from './Book';

import { Space } from 'antd';

function BookList({
    books
}) {

    const view = books.length > 0
        ? books.map(book => <Book key={book._id} book={book} />)
        : <h3>Няма книги в тази категория</h3>

    return (

            <Space
                direction="horizontal"
                size="large"
                style={{
                    display: 'flex',
                    marginTop: 20
                }}
            >
                {view}
            </Space>

    );
}

export default BookList;