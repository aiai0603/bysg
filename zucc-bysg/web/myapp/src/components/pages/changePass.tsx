import React, { Component } from 'react';
import {
    Card,
    Form,
    Input,
    Row,
    Col,
    Button,
    notification,
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { FormProps } from 'antd/lib/form';
import { get, post } from '../../service/tools';
import umbrella from 'umbrella-storage';
import { RouteComponentProps, withRouter } from 'react-router';
const FormItem = Form.Item;

type BasicFormProps = {} & FormProps & RouteComponentProps;

class BasicForms extends Component<BasicFormProps> {
    state = {
        confirmDirty: false,
        loading: false,
        data: {
            adminId:'',
            role:0,
            adminPassword:"",
            state:0
        }
    };
    componentDidMount() {
        this.start();
    };
    back = () => {
        this.props.history.go(-1);
    };
    start = () => {
        this.setState({ loading: true });
        get({
            url: 'http://47.97.158.11:8803/admin/find?id='+umbrella.getLocalStorage('user').id,
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
                   data:res.data
               })
            }
        },)
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       
        this.props.form &&
            this.props.form.validateFieldsAndScroll((err, values) => {
                let adminEntity = this.state.data;
                adminEntity.adminPassword = values.password
                
                if (!err) {
                    post({
                        url: 'http://47.97.158.11:8803/admin/changePass',
                        data: adminEntity
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
                            umbrella.removeLocalStorage('user');
                            this.props.history.push('/login');
        
                            
                        }
                    });
                }else{
                    notification.open({
                        message: '修改失败',
                    });
                    return 0;
                }
            });
    };
    handleConfirmBlur = (e: React.FocusEvent) => {
        const value = e.target && (e.target as any).value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    checkPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && value !== form!.getFieldValue('password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form!;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 10,
                },
            },
        };
       
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="个人信息" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="个人信息" bordered={false}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem {...formItemLayout} label="账号" hasFeedback>
                                        {this.state.data.adminId}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="等级" hasFeedback>
                                        {this.state.data.role == 1?'超级管理员':'管理员'}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="等级" hasFeedback>
                                        {this.state.data.state == 1?'被封禁':'正常'}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="密码" hasFeedback>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入密码!',
                                                },
                                                
                                            ],
                                        })(<Input type="password" />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                                        {getFieldDecorator('confirm', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请确认你的密码!',
                                                },
                                                {
                                                    validator: this.checkPassword,
                                                },
                                            ],
                                        })(
                                            <Input
                                                type="password"
                                                onBlur={this.handleConfirmBlur}
                                            />
                                        )}
                                    </FormItem>
                                       
                                    <FormItem {...tailFormItemLayout}>
                                        
                                        <Button type="primary" htmlType="submit" size="large">
                                            修改密码
                                        </Button>
                                        <Button size="large" onClick={ this.back }>
                                            取消
                                        </Button>

                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                    
                </Row>
               
            </div>
        );
    }
}


export default (Form.create()(withRouter(BasicForms)));


