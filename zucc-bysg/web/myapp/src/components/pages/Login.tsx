/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import { PwaInstaller } from '../widget';
import { connectAlita } from 'redux-alita';
import { RouteComponentProps } from 'react-router';
import { FormProps } from 'antd/lib/form';
import umbrella from 'umbrella-storage';
import { post } from '../../service/tools';

const FormItem = Form.Item;
type LoginProps = {
    setAlitaState: (param: any) => void;
    auth: any;
} & RouteComponentProps &
    FormProps;
class Login extends React.Component<LoginProps> {
    componentDidMount() {
        const { setAlitaState } = this.props;
        setAlitaState({ stateName: 'auth', data: null });
    }
    componentDidUpdate(prevProps: LoginProps) {
        // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        // const { history } = this.props;
        if (nextAuth.data) {
            // 判断是否登陆
            umbrella.setLocalStorage('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }
    }
   
    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.form!.validateFields((err, values) => {
            const { setAlitaState } = this.props;
            if (!values.userName || !values.password) {
                return 0;
            }
            post({
                url: 'http://47.97.158.11:8803/admin/login',
                data: {
                    username: values.userName,
                    password: values.password,
                },
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
                    setAlitaState({ stateName: 'auth' ,data: res.data});

                    notification.open({
                        message: res.rspMsg,
                    });

                    this.props.history.push('/');
                }
            });
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form!;
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <span>管理系统</span>
                        <PwaInstaller />
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                    placeholder="请输入账号"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{ width: '100%' }}
                            >
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connectAlita(['auth'])(Form.create()(Login));
