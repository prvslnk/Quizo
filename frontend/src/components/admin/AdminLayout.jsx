import React from 'react';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    FileTextOutlined,
    FileAddOutlined,
    CheckCircleOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const menuItems = [
        { key: 'users', icon: <UserOutlined />, label: 'Users' },
        { key: 'exams', icon: <FileTextOutlined />, label: 'Exams' },
        { key: 'questions', icon: <FileAddOutlined />, label: 'Questions' },
        { key: 'submissions', icon: <CheckCircleOutlined />, label: 'Submissions' },
        { key: 'results', icon: <CheckCircleOutlined />, label: 'Results' },
        { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' },
    ];

    const onMenuClick = ({ key }) => {
        if (key === 'logout') {
            logout();
            navigate('/login');
        } else {
            navigate(`/admin/${key}`);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
                <div style={{ color: '#fff', padding: 20, fontSize: 18, textAlign: 'center' }}>Admin</div>
                <Menu theme="dark" mode="inline" items={menuItems} onClick={onMenuClick} />
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '24px 16px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
