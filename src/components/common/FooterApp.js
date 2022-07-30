import { Layout } from 'antd';
const { Footer } = Layout;

function FooterApp() {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Created by Ivan Nikolov &copy;2022
        </Footer>
    );
}

export default FooterApp;