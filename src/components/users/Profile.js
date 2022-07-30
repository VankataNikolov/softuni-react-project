

import { Tabs } from 'antd';
const { TabPane } = Tabs;

function Profile() {
    return (
        <Tabs defaultActiveKey="1" centered>
            <TabPane tab="моите книги" key="1">
                Content of Tab Pane 1
            </TabPane>
            <TabPane tab="моите коментари" key="2">
                Content of Tab Pane 2
            </TabPane>
            <TabPane tab="харесани книги" key="3">
                Content of Tab Pane 3
            </TabPane>
        </Tabs>
    );
}

export default Profile;