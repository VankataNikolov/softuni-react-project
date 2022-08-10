import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import FormHeader from '../../common/FormHeader';

import { Button, Form, Input } from 'antd';

import * as authService from '../../../services/authService';


function Register() {

    const navigate = useNavigate();
    const { userLogin } = useContext(AuthContext);
    const [error, setError] = useState('');

    const onFinish = async (values) => {
        const { username, password } = values;

        try {
            const response = await authService.register(username, password);
            const user = await response.json();
            if (user.message) {
                console.log(user.message);
                setError(user.message);
                return;
            }
            userLogin(user);

            navigate("/", { replace: true });
        } catch (err) {
            console.log(err);
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <FormHeader title="Register" errorMessage={error} />
            <Form
                name="register"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 10,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        {
                            min: 4,
                            message: 'Username must be 4 characters at least'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 6,
                            message: 'Password must be 6 characters at least'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm password"
                    name="confirm password"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 6,
                            message: 'Password must be 6 characters at least'
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Password missmatch !'));
                            },
                        })
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Register;