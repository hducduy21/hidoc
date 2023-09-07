import { Table, Button, Input, Space, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const port = 8080;

function UserManager() {
    let [dt, setDT] = useState([]);
    let [load, setLoad] = useState(false);
    const token = Cookies.get('bookmatetoken');
    useEffect(() => {
        axios
            .get('http://localhost:' + port + '/api/users?page=0&size=1000', {
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
            })
            .then((data) => {
                let t = data.data.users.content.map((el) => {
                    return {
                        key: el.id,
                        name: el.name,
                        birthday: el.dob,
                        username: el.username,
                        email: el.email,
                        phone: el.phone,
                        gender: el.gender,
                        status: el.enabled.toString(),
                    };
                });
                setDT(t);
            });
    }, [load]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEnableOpen, setIsModalEnableOpen] = useState(false);
    const [userDelete, setUserDelete] = useState({});
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModalEnable = () => {
        setIsModalEnableOpen(true);
    };
    const handleOk = async () => {
        await axios
            .post(
                'http://localhost:' + port + '/api/users/user/disable/' + userDelete.key,
                {},
                {
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                },
            )
            .then((data) => {
                if (data.status === 200) toast.success('Chặn thành công');
                else toast.error('Chặn không thành công');
            })
            .catch((err) => {
                toast.error('Chặn không thành công:' + err);
            });
        setLoad(!load);
        setIsModalOpen(false);
    };
    const handleEnableOk = async () => {
        await axios
            .post(
                'http://localhost:' + port + '/api/users/user/enable/' + userDelete.key,
                {},
                {
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                },
            )
            .then((data) => {
                if (data.status === 200) toast.success('Bỏ chặn thành công');
                else toast.error('Bỏ chặn không thành công');
            })
            .catch((err) => {
                toast.error('Bỏ chặn không thành công:' + err);
            });
        setLoad(!load);
        setIsModalEnableOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleEnableCancel = () => {
        setIsModalEnableOpen(false);
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            // filterSearch: true,
            // onFilter: (value, record) => record.name.startsWith(value),
            // width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Username',
            dataIndex: 'username',
            ...getColumnSearchProps('username'),
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            ...getColumnSearchProps('gender'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" style={{ color: 'blue' }}>
                    {/* <a>Invite {record.lastName}</a> */}
                    {record.status === 'true' ? (
                        <a
                            onClick={() => {
                                setUserDelete(record);
                                showModal();
                            }}
                        >
                            Disable
                        </a>
                    ) : (
                        <a
                            onClick={() => {
                                setUserDelete(record);
                                showModalEnable();
                            }}
                        >
                            Enable
                        </a>
                    )}
                </Space>
            ),
            width: 150,
        },
    ];
    return (
        <>
            <ToastContainer></ToastContainer>
            <Table columns={columns} dataSource={dt} onChange={onChange} style={{ width: '100%' }}></Table>
            <Modal title="Xác nhận" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <span>Bạn có chắc muốn chặn người dùng {userDelete ? userDelete.name : ''}</span>
            </Modal>
            <Modal title="Xác nhận" open={isModalEnableOpen} onOk={handleEnableOk} onCancel={handleEnableCancel}>
                <span>Bạn có chắc muốn bỏ chặn người dùng {userDelete ? userDelete.name : ''}</span>
            </Modal>
        </>
    );
}

export default UserManager;
