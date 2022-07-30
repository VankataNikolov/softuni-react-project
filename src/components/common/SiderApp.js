import { useState } from 'react';

import { Layout, Menu } from 'antd';
const { Sider } = Layout;

function SiderApp() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsed={collapsed}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        label: 'nav 1',
                    },
                    {
                        key: '2',
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        label: 'nav 3',
                    },
                ]}
            />
        </Sider>
    );
}

export default SiderApp;