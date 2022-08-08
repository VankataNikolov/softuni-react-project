import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import FormHeader from '../../common/FormHeader';

import { Button, Form, Input } from 'antd';
import React from 'react';

import * as authService from '../../../services/authService';

function Login() {

    const navigate = useNavigate();
    const { userLogin } = useContext(AuthContext);
    const [error, setError] = useState('');

    const onFinish = async (values) => {
        const { username, password } = values;

        try {
            const response = await authService.login(username, password);
            const authData = await response.json();
            if (authData.message) {
                console.log(authData.message);
                setError(authData.message);
                return;
            }
            userLogin(authData);

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
            <FormHeader title='Login' errorMessage={error}/>
            <Form
                name="login"
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
                            message: 'Password must be 6 characters at least',
                        }
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

export default Login;