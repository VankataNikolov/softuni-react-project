import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import { Button, Form, Input } from 'antd';

import * as authService from '../../services/authService';


function Register() {

    const navigate = useNavigate();
    const { userLogin } = useContext(AuthContext);

    const onFinish = async (values) => {
        const { username, password } = values;

        const response = await authService.register(username, password);
        const user = await response.json();

        userLogin(user);

        navigate("/", { replace: true });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
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
    );
}

export default Register;