import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { EditOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';
import { Card, Space } from 'antd';
const { Meta } = Card;

function BookDetails() {

    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [comments, setComments] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/books/${bookId}`)
            .then(response => response.json())
            .then(bookData => {
                setBook(bookData.book);
                setComments(bookData.commentsData);
            });
    }, [bookId])

    return (
        <Space
            direction="horizontal"
            size="middle"
            align="start"
            style={{ display: 'flex', justifyContent: 'center' }}
        >
            <div className="site-card-border-less-wrapper">
                <Card
                    cover={
                        <img
                            alt={book.title}
                            src={book.imageUrl}
                        />
                    }
                    bordered={false}
                    style={{
                        width: 250,
                    }}
                >
                    <p>Автор: {book.author}</p>
                    <p>Година на издаване: {book.year}</p>
                    <p>Публикувал: </p>
                    <p>Коментари: {comments.length}</p>
                </Card>
            </div>
            <Card
                style={{
                    width: 700,
                }}
                actions={[
                    <LikeOutlined key="like" />,
                    <CommentOutlined key="comment" />,
                    <EditOutlined key="edit" />,
                ]}
            >
                <Meta
                    title={book.title}
                    description={book.description}
                />
            </Card>

        </Space>
    );
}

export default BookDetails;