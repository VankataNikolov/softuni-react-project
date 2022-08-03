import { Link } from "react-router-dom";

import { Card } from 'antd';
const { Meta } = Card;

function Book({ book }) {

    return (
        <Link to={{ pathname: `/books/${book._id}/details` }}>
            <Card
                hoverable
                style={{
                    width: 220,
                }}
                cover={
                    <img
                        alt={book.title}
                        src={book.imageUrl}
                    />
                }
            >
                <Meta
                    title={book.title}
                    description={book.author}
                />
            </Card>
        </Link>
    );
}

export default Book;