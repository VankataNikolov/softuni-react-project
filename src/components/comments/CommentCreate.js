import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import * as commentService from '../../services/commentService';

import { CommentOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input } from 'antd';
const { TextArea } = Input;

function CommentCreate({
    bookId,
    handleAddComment
}) {

    const [isVisible, setIsVisible] = useState(false);
    const [form] = Form.useForm();
    const { user } = useContext(AuthContext);

    const showModal = () => {
        setIsVisible(true);
    };

    const handleOk = () => {
        setIsVisible(false);
    };

    const handleCancel = () => {
        setIsVisible(false);
    };

    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            const { text } = values;

            const commentData = {
                text,
            }

            const response = await commentService.create(user.accessToken, bookId, commentData);
            const { commentDetails } = await response.json();

            handleOk();
            handleAddComment(commentDetails);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Button type="primary" icon={<CommentOutlined />} onClick={showModal}>
                коментар
            </Button>
            <Modal
                title="Добави коментар"
                visible={isVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={onFinish}>
                        Submit
                    </Button>
                ]}
            >
                <Form
                    form={form}
                    name="add comment"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Напиши коментар за книгата"
                        name="text"
                        rules={[
                            {
                                required: true,
                                message: 'Please input comment',
                            },
                            {
                                min: 20,
                                message: 'Comment must be 20 characters at least'
                            }
                        ]}
                        validateTrigger='onBlur'
                    >
                        <TextArea rows={8} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default CommentCreate;