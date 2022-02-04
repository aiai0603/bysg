/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, notification, InputNumber } from 'antd';
import { FormProps } from 'antd/lib/form';
import { post } from '../../service/tools';
import umbrella from 'umbrella-storage';
const FormItem = Form.Item;

type CollectionCreateFormProps = {
    visible: boolean;
    onCancel: () => void;
    onCreate: () => void;
    ref: any;
} & FormProps;

const CollectionCreateForm: any = Form.create()((props: CollectionCreateFormProps) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form!;
    return (
        <Modal
            visible={visible}
            title="新建会议室"
            okText="创建"
            cancelText="取消"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="vertical">
                <FormItem label="账会议室名称">
                    {getFieldDecorator('conferenceName', {
                        rules: [{ required: true, message: '请输入名称!' }],
                    })(<Input />)}
                </FormItem>
                <FormItem label="会议室密码">
                    {getFieldDecorator('conferencePwd', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(<Input />)}
                </FormItem>
                <FormItem label="设备限制">
                    {getFieldDecorator('num', {
                        rules: [{ required: true }],
                        initialValue:10
                    })(<InputNumber style={{width:'100%'}}/>)}
                </FormItem>
               
            </Form>
        </Modal>
    );
});

class ModalForm extends Component<any,any> {
    state = {
        visible: false,
    };
    form: any;
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err: any, values: any) => {
            values.deleteFlag = 0
            values.state = 0
            values.adminId = umbrella.getLocalStorage('user').id
            
            if (!err) {
                post({
                    url: 'http://localhost:8080/conference/create',
                    data: values,
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
                        this.props.finished();
                        this.setState({ visible: false });
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
            <div >
                <Button type="primary" onClick={this.showModal}>
                    添加数据
                </Button>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default ModalForm;
