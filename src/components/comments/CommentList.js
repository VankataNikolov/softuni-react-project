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
                            style={{
                                backgroundColor:'white',
                                marginBottom: 8,
                                paddingRight: 10,
                                paddingLeft: 10,
                                borderRadius: 10
                            }}
                            author={item.owner.username}
                            content={item.text}
                            datetime={item.created_at.substring(0, 10)}
                        />
                    </li>
                )}
            />
            : <h3 style={{textAlign: 'center'}}>Няма коментари за тази книга</h3>
    );
}

export default CommentList;