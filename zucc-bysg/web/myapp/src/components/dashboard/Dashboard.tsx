/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Icon, notification } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsProjects from './EchartsProjects';
import { get } from '../../service/tools';
import umbrella from 'umbrella-storage';

class Dashboard extends React.Component {
    state = {
        data: {
            conference: 0,
            equipment: 0,
            user: 0,
            history: 0,
            charts:[{
                date:'2020-01-21',
                count:0
            }]
        },

      
    };
   

    componentWillMount() {
        this.start();
    }
    start = () => {
        get({
            url:
                'http://47.97.158.11:8803/admin/init?id=' +
                (umbrella.getLocalStorage('user').role === 2
                    ? umbrella.getLocalStorage('user').id
                    : '0'),
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
                });
                 console.log( res.data.charts )
            }


           
        });
    };
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row gutter={24}>
                    <Col md={6}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="bank" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">会议室</div>
                                        <h2>{this.state.data.conference}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="cluster" className="text-2x" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">设备</div>
                                        <h2>{this.state.data.equipment}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="user" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">用户</div>
                                        <h2>{this.state.data.user}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="file" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">使用次数</div>
                                        <h2>{this.state.data.history}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} >
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false} style={{backgroundColor: 'white',}}>
                                <EchartsProjects />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;
