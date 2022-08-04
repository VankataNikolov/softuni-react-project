import { Popconfirm } from 'antd';

function PopupConfirm({
    children,
    text,
    onConfirmHandler
}) {
    return (
        <Popconfirm
            title={text}
            okText="Yes"
            cancelText="No"
            onConfirm={() => onConfirmHandler()}
        >
            {children}
        </Popconfirm>
    );
}

export default PopupConfirm;