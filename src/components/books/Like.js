import * as bookService from '../../services/bookService';

import { Button } from 'antd'
import { LikeOutlined } from '@ant-design/icons';

function Like({
    user,
    bookId,
    likeHandler
}) {
    async function clickHandler () {
        try {
            const response = await bookService.like(user, bookId);
            const book = await response.json();

            likeHandler(book);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Button type="primary" icon={<LikeOutlined />} onClick={clickHandler}>
            харесай
        </Button>
    );
}
export default Like;