/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Button, Row, Col, Card, notification, Input, Icon, Avatar } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { get } from '../../service/tools';
import { withRouter } from 'react-router-dom';

class HistoryIdTable extends React.Component<any, any> {
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

    back = () => {
        this.props.history.go(-1);
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
            url: 'http://localhost:8080/history/findbyid?id=' + this.props.match.params.id,
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
                    const match = record.name.match(reg);
                    if (!match) {
                        return null;
                    }
                    return {
                        ...record,
                        name: (
                            <span>
                                {record.name
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
                width: '20%',
                sorter: (a: any, b: any) => a.id - b.id,
            },
            {
                title: '会议标题',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={(ele) => (this.searchInput = ele)}
                            placeholder="请输入昵称"
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
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: '25%',
                render: (text: number) => <div>{this.crtTimeFtt(text)}</div>,
            },
            {
                title: '结束时间',
                dataIndex: 'finishTime',
                key: 'finishTime',
                width: '25%',
                render: (text: number) => <div>{this.crtTimeFtt(text)}</div>,
            },
        ];

        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="历史记录" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="历史记录管理" bordered={false}>
                                <div style={{ marginBottom: 16, display: 'flex' }}>
                                    <Button type="primary" onClick={this.back}>
                                        返回
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={this.start}
                                        disabled={loading}
                                        loading={loading}
                                        style={{ marginRight: 16 }}
                                    >
                                        刷新
                                    </Button>

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

export default withRouter(HistoryIdTable);
