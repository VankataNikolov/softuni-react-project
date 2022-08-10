import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

import * as bookService from '../../services/bookService'

import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
const { TextArea } = Input;

function BookCreate(props) {

    const [edit, setEdit] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const accessToken = user.accessToken;

    useEffect(() => {
        if (props.book) {
            setEdit(true);
            setInitialValues(props.book);
        }
    }, [props.book])

    useEffect(() => {
        form.resetFields();
    }, [initialValues, form])

    const onFinish = async (values) => {

        const bookData = {
            title: values.title,
            author: values.author,
            category: values.category,
            description: values.description,
            year: values.year,
            imageUrl: values.imageUrl
        };

        if (edit) {
            const response = await bookService.update(initialValues._id, bookData, accessToken);
            const book = await response.json();
            navigate(`/books/${book._id}/details`);
        } else {
            await bookService.create(bookData, accessToken);
            navigate("/");
        }

    };

    return (
        <Form
            form={form}
            name='bookForm'
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <Form.Item
                label="Заглавие"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Please input title',
                    },
                    {
                        min: 2,
                        message: 'Title must be 2 characters at least'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Автор"
                name="author"
                rules={[
                    {
                        required: true,
                        message: 'Please input author',
                    },
                    {
                        min: 2,
                        message: 'Author must be 2 characters at least'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Категория"
                name="category"
                rules={[
                    {
                        required: true,
                        message: 'Please select category',
                    }
                ]}
            >
                <Select>
                    <Select.Option value="technology">Технологии</Select.Option>
                    <Select.Option value="children">За деца</Select.Option>
                    <Select.Option value="fiction">Художествена литература</Select.Option>
                    <Select.Option value="hobbies">Хоби и свободно време</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Описание"
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Please input description',
                    },
                    {
                        min: 20,
                        message: 'Description must be 20 characters at least'
                    }
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item
                label="Година на издаване"
                name="year"
                rules={[
                    {
                        required: true,
                        message: "Year is required",
                    },
                    {
                        pattern: /^(?:\d*)$/,
                        message: "Year should be number",
                    },
                    () => ({
                        validator(_, value) {
                            if (1900 <= value && value <= 2022) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Tne year should be between 1900 and 2022'));
                        },
                    })
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="URL снимка на корица"
                name="imageUrl"
                rules={[
                    {
                        required: true,
                        message: 'Please input image URL',
                    },
                    {
                        pattern: /^http?/,
                        message: 'Invalid image URL'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 14,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default BookCreate;