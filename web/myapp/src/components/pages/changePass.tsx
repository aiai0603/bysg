import React, { Component } from 'react';
import {
    Card,
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
} from 'antd';


import BreadcrumbCustom from '../BreadcrumbCustom';
import { FormProps } from 'antd/lib/form';
const FormItem = Form.Item;
const Option = Select.Option;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

type BasicFormProps = {} & FormProps;

class BasicForms extends Component<BasicFormProps> {
    state = {
        confirmDirty: false,
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
    checkConfirm = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form!.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        const { getFieldDecorator } = this.props.form!;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
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
                    offset: 8,
                },
            },
        };
      
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="修改密码" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="修改密码" bordered={false}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem {...formItemLayout} label="邮箱" hasFeedback>
                                        {getFieldDecorator('email', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入邮箱地址!',
                                                },
                                            ],
                                        })(<Input />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="密码" hasFeedback>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入密码!',
                                                },
                                                {
                                                    validator: this.checkConfirm,
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
                                            注册
                                        </Button>
                                        <Button type="primary" htmlType="submit" size="large">
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

const changePass = Form.create()(BasicForms);

export default changePass;

