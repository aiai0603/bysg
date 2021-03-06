/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {
    Table,
    Button,
    Row,
    Col,
    Card,
    notification,
    Input,
    Icon,
    Popconfirm,
    Tabs,
    Avatar,
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { get } from '../../service/tools';
import ModalForm from './ModalForm';
import UpdateForm from './UpdateForm';
import umbrella from 'umbrella-storage';

const { TabPane } = Tabs;

class equipmentTable extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data: [],
        firstdata: [],
        filterDropdownVisible: false,
        searchText: '',
        filterDropdownVisible2: false,
        searchText2: '',
        filtered: false,
        filtered2:false,
        flag: '0',
    };
    // eslint-disable-next-line react/sort-comp
    handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log('Various parameters', pagination, filters, sorter);
    };

    callback = (key: any) => {
        console.log(key);
        this.setState(
            {
                flag: key - 1,
            },
            () => {
                this.start();
            }
        );
    };

    bindRef = (ref: any) => {
        this.child = ref;
    };

    btnClick = () => {
        this.child.getValuefromChild();
    };
    child: any;

    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        get({
            url: 'http://47.97.158.11:8803/equipment/findall?flag=' + this.state.flag+'&id='+(umbrella.getLocalStorage('user').role===2?umbrella.getLocalStorage('user').id:'0'),
        }).then((res) => {
            if (!res) {
                notification.open({
                    message: '后台异常',
                });
                return 0;
            }
            if (res.rspCode !== '200') {
                notification.open({
                    message: res.rspMsg,
                });
            } else {
                this.setState({
                    data: res.data,
                    firstdata: res.data,
                });
                this.setState({ loading: false });
            }
        });
    };
    searchInput: any;
    searchInput2: any;
    onInputChange2 = (e: any) => {
        this.setState({ searchText2: e.target.value });
    };
    onInputChange = (e: any) => {
        this.setState({ searchText: e.target.value });
    };

    handleDelete(id: any) {
        get({
            url: 'http://47.97.158.11:8803/equipment/delete?id=' + id,
        }).then((res) => {
            if (!res) {
                notification.open({
                    message: '后台异常',
                });
                return 0;
            }
            if (res.rspCode !== '200') {
                notification.open({
                    message: res.rspMsg,
                });
            } else {
                notification.open({
                    message: res.rspMsg,
                });
                this.start();
            }
        });
    }
    crtTimeFtt(val: string | number | Date | null) {
        if (val != null) {
            var date = new Date(val);
            return (
                date.getFullYear() +
                '-' +
                (date.getMonth() + 1) +
                '-' +
                date.getDate() +
                ' ' +
                date.getHours() +
                ':' +
                date.getMinutes() +
                ':' +
                date.getSeconds()
            );
        }
    }

    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.state.firstdata
                .map((record: any) => {
                    const match = record.equipmentId.match(reg);
                    if (!match) {
                        return null;
                    }
                    return {
                        ...record,
                        equipmentId: (
                            <span>
                                {record.equipmentId
                                    .split(reg)
                                    .map((text: any, i: number) =>
                                        i > 0
                                            ? [<span className="highlight">{match[0]}</span>, text]
                                            : text
                                    )}
                            </span>
                        ),
                    };
                })
                .filter((record) => !!record),
        });
    };


    onSearch2 = () => {
        const { searchText2 } = this.state;
        const reg = new RegExp(searchText2, 'gi');
        this.setState({
            filterDropdownVisible2: false,
            filtered2: !!searchText2,
            data: this.state.firstdata
                .map((record: any) => {
                    const match = record.equipmentId.match(reg);
                    if (!match) {
                        return null;
                    }
                    return {
                        ...record,
                        equipmentId: (
                            <span>
                                {record.equipmentId
                                    .split(reg)
                                    .map((text: any, i: number) =>
                                        i > 0
                                            ? [<span className="highlight">{match[0]}</span>, text]
                                            : text
                                    )}
                            </span>
                        ),
                    };
                })
                .filter((record) => !!record),
        });
    };

    render() {
        let { loading, selectedRowKeys } = this.state;

        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                width: '8%',
                sorter: (a: any, b: any) => a.id - b.id,
            },
            {
                title: '设备ID',
                dataIndex: 'equipmentId',
                key: 'equipmentId',
                width: '12%',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={(ele) => (this.searchInput = ele)}
                            placeholder="请输入设备名"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>
                            搜索
                        </Button>
                    </div>
                ),
                filterIcon: (
                    <Icon
                        type="smile-o"
                        style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }}
                    />
                ),
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible: boolean) =>
                    this.setState({ filterDropdownVisible: visible }, () =>
                        this.searchInput.focus()
                    ),
            },
            {
                title: '版本',
                dataIndex: 'equipmentVersion',
                key: 'equipmentVersion',
                width: '10%',
            },
            {
                title: '照片',
                dataIndex: 'picture',
                key: 'picture',
                width: '10%',
                render: (text: string) => text !== '暂无数据'?<Avatar shape="square" src={text} size={80} />:<div >暂无数据</div>
            },
            {
                title: 'IP',
                dataIndex: 'ip',
                key: 'ip',
                width: '15%',
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: '10%',
                render: (text: number) => <div>{text === 1 ? '封禁' : '正常'}</div>,
                filterSearch: true,
                filters: [
                    { text: '正常', value: '0' },
                    { text: '封禁', value: '1' },
                ],
                onFilter: (value: any, record: any) => record.state.toString() === value,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: '15%',
                render: (text: number) => <div>{this.crtTimeFtt(text)}</div>,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: '20%',
                render: (text: any, record: any) => (
                    <div style={{ display: 'flex' }}>
                        <Popconfirm
                            title="你确定要删除吗？"
                            onConfirm={() => this.handleDelete(record.id)}
                            style={{ marginRight: 16 }}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{ marginRight: 16 }}>删除</a>
                        </Popconfirm>
                        <UpdateForm
                            adminId={record.id}
                            style={{ marginRight: 16 }}
                            finished={() => this.start()}
                        />
                    </div>
                ),
            },
        ];



        const columns2 = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                width: '8%',
                sorter: (a: any, b: any) => a.id - b.id,
            },
            {
                title: '设备ID',
                dataIndex: 'equipmentId',
                key: 'equipmentId',
                width: '10%',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={(ele) => (this.searchInput2 = ele)}
                            placeholder="请输入设备名"
                            value={this.state.searchText2}
                            onChange={this.onInputChange2}
                            onPressEnter={this.onSearch2}
                        />
                        <Button type="primary" onClick={this.onSearch2}>
                            搜索
                        </Button>
                    </div>
                ),
                filterIcon: (
                    <Icon
                        type="smile-o"
                        style={{ color: this.state.filtered2 ? '#108ee9' : '#aaa' }}
                    />
                ),
                filterDropdownVisible: this.state.filterDropdownVisible2,
                onFilterDropdownVisibleChange: (visible: boolean) =>
                    this.setState({ filterDropdownVisible2: visible }, () =>
                        this.searchInput2.focus()
                    ),
            },
            {
                title: '所属会议室',
                dataIndex: 'conferenceName',
                key: 'conferenceName',
                width: '15%',
            },
            {
                title: '版本',
                dataIndex: 'equipmentVersion',
                key: 'equipmentVersion',
                width: '10%',
            },
            {
                title: '照片',
                dataIndex: 'picture',
                key: 'picture',
                width: '10%',
                render: (text: string) => text !== '暂无数据'?<Avatar shape="square" src={text} size={80} />:<div >暂无数据</div>
            },
            {
                title: 'IP',
                dataIndex: 'ip',
                key: 'ip',
                width: '15%',
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: '8%',
                render: (text: number) => <div>{text === 1 ? '封禁' : '正常'}</div>,
                filterSearch: true,
                filters: [
                    { text: '正常', value: '0' },
                    { text: '封禁', value: '1' },
                ],
                onFilter: (value: any, record: any) => record.state.toString() === value,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: '15%',
                render: (text: number) => <div>{this.crtTimeFtt(text)}</div>,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: '20%',
                render: (text: any, record: any) => (
                    <div style={{ display: 'flex' }}>
                        <Popconfirm
                            title="你确定要删除吗？"
                            onConfirm={() => this.handleDelete(record.id)}
                            style={{ marginRight: 16 }}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{ marginRight: 16 }}>删除</a>
                        </Popconfirm>
                        <UpdateForm
                            adminId={record.id}
                            style={{ marginRight: 16 }}
                            finished={() => this.start()}
                        />
                    </div>
                ),
            },
        ];




        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="设备" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="设备管理" bordered={false}>
                                <div style={{ marginBottom: 16, display: 'flex' }}>
                                    <Button
                                        type="primary"
                                        onClick={this.start}
                                        disabled={loading}
                                        loading={loading}
                                        style={{ marginRight: 16 }}
                                    >
                                        刷新
                                    </Button>
                                    <ModalForm finished={() => this.start()} />

                                    <span style={{ marginLeft: 8 }}>
                                        {hasSelected
                                            ? `Selected ${selectedRowKeys.length} items`
                                            : ''}
                                    </span>
                                </div>
                                <Tabs defaultActiveKey="1" onChange={this.callback}>
                                    <TabPane tab="未分配" key="1">
                                        <Table
                                            columns={columns}
                                            dataSource={this.state.data}
                                            onChange={this.handleChange}
                                        />
                                        <style>{`
                                        .custom-filter-dropdown {
                                            padding: 8px;
                                            border-radius: 6px;
                                            background: #fff;
                                            box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                                        }
                                        .custom-filter-dropdown input {
                                            width: 130px;
                                            margin-right: 8px;
                                        }
                                        .highlight {
                                            color: #f50;
                                        }
                                `}</style>
                                    </TabPane>
                                    <TabPane tab="已分配" key="2">
                                        <Table
                                            columns={columns2}
                                            dataSource={this.state.data}
                                            onChange={this.handleChange}
                                        />
                                        <style>{`
                                        .custom-filter-dropdown {
                                            padding: 8px;
                                            border-radius: 6px;
                                            background: #fff;
                                            box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                                        }
                                        .custom-filter-dropdown input {
                                            width: 130px;
                                            margin-right: 8px;
                                        }
                                        .highlight {
                                            color: #f50;
                                        }
                                `}</style>
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default equipmentTable;
