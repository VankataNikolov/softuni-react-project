import { Comment, List } from 'antd';

function CommentList({
    comments
}) {
    return (
        comments.length > 0
            ? <List
                className="comment-list"
                header={`${comments.length} коментара`}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={(item) => (
                    <li>
                        <Comment
                            author={item.owner.username}
                            content={item.text}
                            datetime={item.created_at}
                        />
                    </li>
                )}
            />
            : <h3 style={{textAlign: 'center'}}>Няма коментари за тази книга</h3>
    );
}

export default CommentList;