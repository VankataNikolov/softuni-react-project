import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import Like from './Like';
import CommentList from '../comments/CommentList';
import CommentCreate from '../comments/CommentCreate';

import { HeartFilled } from '@ant-design/icons';
import { Card, Space } from 'antd';
const { Meta } = Card;

function BookDetails() {

    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [comments, setComments] = useState([]);

    const { user, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/books/${bookId}`)
            .then(response => response.json())
            .then(bookData => {
                setBook(bookData.book);
                setComments(bookData.commentsData);
            });
    }, [bookId])

    const userId = user._id;

    const isOwner = book.owner?._id === userId;
    let isLiked = false;
    let likes = 0;
    if (book.likes?.length > 0) {
        isLiked = book.likes.find(x => x === userId);
        likes = book.likes.length;
    }

    function handleAddComment(newComment) {
        setComments(oldVal => [...oldVal, newComment]);
    }

    function handleLike(book) {
        setBook(book);
    }

    const buttons = (
        <Space
            direction="horizontal"
            size="small"
            align="start"
            style={{ display: 'flex', justifyContent: 'start', marginTop: 15 }}
        >
            {
                isAuthenticated
                && !isOwner
                && <CommentCreate
                    bookId={bookId}
                    handleAddComment={handleAddComment}
                />
            }
            {
                isAuthenticated
                && !isLiked
                && !isOwner
                && <Like
                    user={user}
                    bookId={bookId}
                    likeHandler={handleLike}
                />
            }
        </Space>
    );

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
                        extra={
                            <>
                                <HeartFilled style={{ color: 'green', marginRight: 10 }} />
                                {likes}
                            </>
                        }
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
                >
                    <Meta
                        title={book.title}
                        description={book.description}
                    />
                    {buttons}
                </Card>

            </Space>
            <CommentList comments={comments} />
        </>
    );
}

export default BookDetails;