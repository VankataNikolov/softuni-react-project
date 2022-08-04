import { useNavigate } from 'react-router-dom';
import * as bookService from '../../services/bookService';
import Popupconfirm from '../common/PopupConfirm';

import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';

function BookDelete({
    user,
    book
}) {

    const navigate = useNavigate();

    async function deleteHandler() {
        try {
            await bookService.deleteBook(user, book._id);
            navigate("/", { replace: true });
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <Popupconfirm
            text={`Изтриване на ${book.title} ?`}
            onConfirmHandler={deleteHandler}
        >
            <Button
                danger
                type="primary"
                icon={<DeleteOutlined />}
            >
                изтрий
            </Button>
        </Popupconfirm>

    );
}

export default BookDelete;