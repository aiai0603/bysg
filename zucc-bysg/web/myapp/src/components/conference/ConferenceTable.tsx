/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Button, Row, Col, Card, notification, Input, Icon, Popconfirm } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { get } from '../../service/tools';
import ModalForm from './ModalForm';
import UpdateForm from './UpdateForm';
import umbrella from 'umbrella-storage';
import { Link } from 'react-router-dom';

class ConferenceTable extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data: [],
        firstdata: [],
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
    };
    // eslint-disable-next-line react/sort-comp
    handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log('Various parameters', pagination, filters, sorter);
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
            url: 'http://47.97.158.11:8803/conference/findall?id='+(umbrella.getLocalStorage('user').role===2?umbrella.getLocalStorage('user').id:'0'),
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
    onInputChange = (e: any) => {
        this.setState({ searchText: e.target.value });
    };

    handleDelete(id: any) {
        get({
            url: 'http://47.97.158.11:8803/conference/delete?id=' + id,
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
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
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
                    const match = record.conferenceName.match(reg);
                    if (!match) {
                        return null;
                    }
                    return {
                        ...record,
                        conferenceName: (
                            <span>
                                {record.conferenceName
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
                width: '10%',
                sorter: (a: any, b: any) => a.id - b.id,
            },
            {
                title: '会议室名字',
                dataIndex: 'conferenceName',
                key: 'conferenceName',
                width: '15%',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={(ele) => (this.searchInput = ele)}
                            placeholder="请输入会议室名"
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
                title: '设备最大值',
                dataIndex: 'num',
                key: 'num',
                width: '15%',
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: '15%',
                render: (text: number) => <div>{text === 1 ? '禁用' : '正常'}</div>,
                filterSearch: true,
                filters: [
                    { text: '正常', value: '0' },
                    { text: '禁用', value: '1' },
                ],
                onFilter: (value: any, record: any) => record.state.toString() === value,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: '20%',
                render: (text: number) => <div>{this.crtTimeFtt(text)}</div>,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: '25%',
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
                            id={record.id}
                            style={{ marginRight: 16 }}
                            finished={() => this.start()}
                        />
                        <Link style={{ marginLeft: 16 }} to={'/app/equipment/'+record.id}>设备</Link>
                        <Link style={{ marginLeft: 16 }} to={'/app/history/'+record.id}>历史</Link>
                    </div>
                ),
            },
        ];


        

        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="会议室" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="会议室管理" bordered={false}>
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
                                    <ModalForm finished={() => this.start()}/>

                                    <span style={{ marginLeft: 8 }}>
                                        {hasSelected
                                            ? `Selected ${selectedRowKeys.length} items`
                                            : ''}
                                    </span>
                                </div>
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
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ConferenceTable;
