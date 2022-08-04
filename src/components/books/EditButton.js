import { useNavigate } from 'react-router-dom';

import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function EditButton({
    bookId
}) {

    const navigate = useNavigate();

    function clickHandler() {
        navigate(`/books/${bookId}/edit`);
    }

    return (
        <Button 
        type="primary"
        icon={<EditOutlined />}
        onClick={clickHandler}>
            промени
        </Button>
    );
}

export default EditButton;