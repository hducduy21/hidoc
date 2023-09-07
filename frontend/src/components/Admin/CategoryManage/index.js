import { Table, Button, Input, Space, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
const { Column } = Table;
const port = 8080;

function CategoryManage() {
    const token = Cookies.get('bookmatetoken');
    let [dt, setDT] = useState([]);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        // axios
        //     .get('http://localhost:' + port + '/api/categories?page=0&size=1000', {
        //         headers: { 'Content-Type': 'application/json' },
        //     })
        //     .then((data) => {
        //         let t = data.data.categories.content.map((el) => {
        //             return {
        //                 key: el.id,
        //                 name: el.name,
        //                 description: el.description,
        //             };
        //         });
        //         setDT(t);
        //     });
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookDelete, setBookDelete] = useState({});
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        await axios
            .delete('http://localhost:' + port + '/api/categories/' + bookDelete.key, {
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
            })
            .then((data) => {
                if (data.status === 200) toast.success('Xóa thành công');
                else toast.error('Xóa không thành công');
            })
            .catch((err) => {
                toast.error('Xóa không thành công: ' + err);
            });
        setLoad(!load);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };
    const handleCreateOk = async () => {
        let nameC = document.getElementById('nameCreate');
        let descC = document.getElementById('descCreate');
        await axios
            .post(
                'http://localhost:' + port + '/api/categories',
                { name: nameC.value, description: descC.value },
                {
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                },
            )
            .then((data) => {
                console.log(data);
                if (data.status === 200) toast.success('Tạo thành công');
                else toast.error('Tạo không thành công');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Tạo không thành công: ' + err);
            });
        setLoad(!load);
        setIsModalCreateOpen(false);
    };

    const handleCreateCancel = () => {
        setIsModalCreateOpen(false);
    };
    const [Cate, setCateUpdate] = useState([]);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const showModalUpdate = () => {
        setIsModalUpdateOpen(true);
    };
    const handleUpdateOk = async () => {
        let nameC = document.getElementById('nameUpdate');
        let descC = document.getElementById('descUpdate');
        await axios
            .put(
                'http://localhost:' + port + '/api/categories/' + Cate.key,
                { name: nameC.value, description: descC.value },
                {
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                },
            )
            .then((data) => {
                console.log(data);
                if (data.status === 200) toast.success('Cập nhật thành công');
                else toast.error('Cập nhật không thành công');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Cập nhật không thành công: ' + err);
            });
        setLoad(!load);
        setIsModalUpdateOpen(false);
    };

    const handleUpdateCancel = () => {
        setIsModalUpdateOpen(false);
    };
    const columns = [
        {
            title: 'Id',
            dataIndex: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            // filterSearch: true,
            // onFilter: (value, record) => record.name.startsWith(value),
            // width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" style={{ color: 'blue' }}>
                    {/* <a>Invite {record.lastName}</a> */}
                    <a
                        onClick={() => {
                            setCateUpdate(record);
                            showModalUpdate();
                        }}
                    >
                        Cập nhật
                    </a>
                    <a
                        onClick={() => {
                            setBookDelete(record);
                            showModal();
                        }}
                    >
                        Xóa
                    </a>
                </Space>
            ),
            width: 150,
        },
    ];

    return (
        <>
            <Button
                type="primary"
                style={{ marginTop: '50px' }}
                onClick={() => {
                    showModalCreate();
                }}
            >
                Tạo category
            </Button>
            <ToastContainer></ToastContainer>
            <Table columns={columns} dataSource={dt} onChange={onChange} style={{ width: '100%' }}></Table>
            <Modal title="Xác nhận" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <span>Bạn có chắc muốn xóa danh mục '{bookDelete.name}'</span>
            </Modal>
            <Modal title="Thêm danh mục" open={isModalCreateOpen} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                <label>Tên danh mục:</label>
                <Input id="nameCreate" placeholder="Nhập tên danh mục mới" />
                <label style={{ marginTop: '10px' }}>Mô tả:</label>
                <textarea id="descCreate" style={{ width: '100%', height: '100px' }}></textarea>
            </Modal>
            <Modal title="Thêm danh mục" open={isModalUpdateOpen} onOk={handleUpdateOk} onCancel={handleUpdateCancel}>
                <label>Tên danh mục:</label>
                <Input id="nameUpdate" defaultValue={Cate.name} />
                <label style={{ marginTop: '10px' }}>Mô tả:</label>
                <textarea
                    id="descUpdate"
                    style={{ width: '100%', height: '100px' }}
                    defaultValue={Cate.description}
                ></textarea>
            </Modal>
        </>
    );
}

export default CategoryManage;
