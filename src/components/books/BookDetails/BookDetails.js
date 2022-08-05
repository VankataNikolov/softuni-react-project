import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

import Like from '../Like';
import EditButton from '../EditButton';
import CommentList from '../../comments/CommentList';
import CommentCreate from '../../comments/CommentCreate';
import BookDelete from '../BookDelete';

import * as bookService from '../../../services/bookService';

import { HeartFilled } from '@ant-design/icons';
import { Card, Space } from 'antd';
const { Meta } = Card;

function BookDetails() {

    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [comments, setComments] = useState([]);

    const { user, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        bookService.details(bookId)
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
        setComments(oldVal => [newComment, ...oldVal]);
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
            {
                isAuthenticated
                && isOwner
                &&
                <>
                    <EditButton bookId={bookId} />
                    <BookDelete user={user} book={book} />
                </>
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
                <Card
                    cover={
                        <img
                            alt={book.title}
                            src={book.imageUrl}
                        />
                    }
                    bordered={false}
                    style={{
                        width: 200,
                    }}
                    extra={
                        <>
                            <HeartFilled style={{ color: 'green', marginRight: 10 }} />
                            {likes}
                        </>
                    }
                >
                </Card>
                <Card>
                    <p>Автор: {book.author}</p>
                    <p>Година на издаване: {book.year}</p>
                    <p>Публикувал: {book.owner?.username}</p>
                </Card>
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
            <Space
                direction="vertical"
                size="middle"
                align="center"
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <CommentList comments={comments} />
            </Space>
        </>
    );
}

export default BookDetails;