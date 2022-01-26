import React, { Component } from 'react';
import {
    Card,
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    notification,
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { FormProps } from 'antd/lib/form';
import { get } from '../../service/tools';
import umbrella from 'umbrella-storage';
import { RouteComponentProps } from 'react-router';
const FormItem = Form.Item;

type BasicFormProps = {} & FormProps & RouteComponentProps;

class BasicForms extends Component<BasicFormProps> {
    state = {
        confirmDirty: false,
        loading: false,
        data: {
            adminId:'',
            role:0
        }
    }

    componentDidMount() {
        this.start();
    };
    start = () => {
        this.setState({ loading: true });
        get({
            url: 'http://localhost:8080/admin/find?username='+umbrella.getLocalStorage('user').adminId,
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
                if (!err) {
                    console.log('Received values of form: ', values);
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
            callback('Two passwords that you enter is inconsistent!');
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

const changePass = Form.create()(BasicForms);

export default changePass;


