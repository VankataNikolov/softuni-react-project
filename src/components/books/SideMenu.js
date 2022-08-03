import { Menu } from 'antd';
import React, { useState } from 'react';

function SideMenu({
    changeCategory
}) {

    const [current, setCurrent] = useState('all');

    const onClick = (e) => {
        changeCategory(e.key);
        setCurrent(e.key);
    };

    const items = [
        {
            label: 'всички',
            key: 'all',
        },
        {
            label: 'технологии',
            key: 'technology',
        },
        {
            label: 'за деца',
            key: 'children',
        },
        {
            label: 'художествена литераура',
            key: 'fiction',
        },
        {
            label: 'хоби и свободно време',
            key: 'hobbies',
        },
    ];
    return (
        <Menu onClick={onClick} selectedKeys={[current]} theme="light" mode="horizontal" items={items} />
    );
};

export default SideMenu;