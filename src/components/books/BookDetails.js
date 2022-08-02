import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import CommentList from '../comments/CommentList';
import CommentCreate from '../comments/CommentCreate';

import { EditOutlined, LikeOutlined } from '@ant-design/icons';
import { Card, Space } from 'antd';
const { Meta } = Card;

function BookDetails() {

    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [comments, setComments] = useState([]);

    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/books/${bookId}`)
            .then(response => response.json())
            .then(bookData => {
                setBook(bookData.book);
                setComments(bookData.commentsData);
            });
    }, [bookId])

    function handleAddComment(newComment) {
        setComments(oldVal => [...oldVal, newComment]);
    }

    return (
        <>
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
                            width: 220,
                        }}
                    >
                        <p>Автор: {book.author}</p>
                        <p>Година на издаване: {book.year}</p>
                        <p>Публикувал: {book.owner?.username}</p>
                    </Card>
                </div>
                <Card
                    style={{
                        width: 700,
                    }}
                // actions={[
                //     <LikeOutlined key="like" />,
                //     <CommentCreate />,
                //     <EditOutlined key="edit" />,
                // ]}

                >
                    <Meta
                        title={book.title}
                        description={book.description}
                    />
                    {isAuthenticated
                        && <CommentCreate
                            bookId={bookId}
                            handleAddComment={handleAddComment}
                        />}
                </Card>

            </Space>
            <CommentList comments={comments} />
        </>
    );
}

export default BookDetails;