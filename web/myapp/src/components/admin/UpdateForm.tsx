/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, notification } from 'antd';
import { FormProps } from 'antd/lib/form';
import { get, post } from '../../service/tools';
import umbrella from 'umbrella-storage';
const FormItem = Form.Item;

type CollectionCreateFormProps = {
    visible: boolean;
    onCancel: () => void;
    onCreate: () => void;
    ref: any;
    data:any
} & FormProps;

const CollectionCreateForm: any = Form.create()((props: CollectionCreateFormProps) => {
    const { visible, onCancel, onCreate, form , data} = props;
    const { getFieldDecorator } = form!;
    return (
        <Modal
            visible={visible}
            title="修改管理员信息"
            okText="提交"
            cancelText="取消"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="vertical">
                <FormItem label="账号">
                    {getFieldDecorator('adminId', {
                        rules: [{ required: true, message: '请输入账号!' }],
                        initialValue:data?data.adminId:null
                    })(<Input />)}
                </FormItem>
                <FormItem label="密码">
                    {getFieldDecorator('adminPassword', {
                        rules: [{ required: true, message: '请输入密码!' }],
                        initialValue:data?data.adminPassword:null
                    })(<Input />)}
                </FormItem>
                <FormItem label="等级"
                    className="collection-create-form_last-form-item"
                    style={{ marginBottom: 0 }}
                >
                    {getFieldDecorator('role', {
                        initialValue: data?String(data.role):"1"
                    })(
                        <Radio.Group>
                            <Radio value="1">超级管理员</Radio>
                            <Radio value="2">普通管理员</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem label="状态"
                    className="collection-create-form_last-form-item"
                    style={{ marginBottom: 0 }}
                >
                    {getFieldDecorator('state', {
                        initialValue: data?String(data.state):"0"
                    })(
                        <Radio.Group>
                            <Radio value="0">正常</Radio>
                            <Radio value="1">封禁</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
});

class UpdateForm extends Component<any,any> {


    // eslint-disable-next-line react/sort-comp
    state = {
        visible: false,
        data:{
            role:1,
            state:0,
            adminId:'',
            adminPassword:'',
        },
    };
    form: any;
    showModal = () => {
       
        get({
            url: 'http://localhost:8080/admin/find?id='+this.props.adminId,
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
        this.setState({ visible: true });
    };


    handleCancel = () => {
        this.setState({ visible: false });
    };
    
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err: any, values: any) => {
            let mydata = this.state.data
            mydata.role = parseInt(values.role)
            mydata.state = parseInt(values.state)
            mydata.adminId = values.adminId
            mydata.adminPassword = values.adminPassword
         
            if (!err) {
                post({
                    url: 'http://localhost:8080/admin/create',
                    data: mydata,
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
                        form.resetFields();
                        this.setState({ visible: false });
                        this.props.finished()
                    }
                });
            } else {
                notification.open({
                    message: '修改失败',
                });
                return 0;
            }
           
        });
    };
    saveFormRef = (form: any) => {
        this.form = form;
    };
    render() {
        return (
            <div>
             
                <a onClick={this.showModal}>
                    修改
                </a>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    data={this.state.data}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default UpdateForm;
