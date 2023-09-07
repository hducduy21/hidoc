import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import Images from '~/assets/Images';
import styles from './AdminLayout.scss';
import Cookies from 'js-cookie';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Quản lý bệnh viện', '1', <DesktopOutlined />),
    getItem('Quản lý bác sỹ', '2', <DesktopOutlined />),
    getItem('Quản lý bài viết', '3', <DesktopOutlined />),
    getItem('Quản lý người dùng', '4', <DesktopOutlined />),
    getItem('Quản lý banner', '5', <DesktopOutlined />),
    getItem('Đăng xuất', '9', <LogoutOutlined />),
];

function AdminLayout({ page = '1', children }) {
    const [collapsed, setCollapsed] = useState(false);

    const onClick = (e) => {
        console.log(e.key);
        if (e.key === '1' || e.key === '11') {
            window.location.href = '/admin';
        } else if (e.key === '12') {
            window.location.href = '/admin/addbook';
        } else if (e.key === '2') {
            window.location.href = '/admin/user';
        } else if (e.key === '3') {
            window.location.href = '/admin/category';
        } else if (e.key === '9') {
            console.log('logout');
            Cookies.set('bookmatetoken', 't', {
                expires: 0,
            });
            window.location.href = '/';
        }
    };
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <img
                    src={Images.logo2}
                    alt="Logo"
                    className="admin_logo"
                    onClick={() => {
                        window.location.href = '/admin';
                    }}
                    style={{
                        height: 50,
                        cursor: 'pointer',
                    }}
                />
                <Menu
                    onClick={onClick}
                    theme="dark"
                    defaultSelectedKeys={[page]}
                    mode="inline"
                    items={items}
                    style={{ marginTop: '30px' }}
                />
            </Sider>
            <Layout className="site-layout">
                <Content
                    className="admin_content"
                    style={{
                        margin: '0 16px',
                    }}
                >
                    {children}
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                ></Footer>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
