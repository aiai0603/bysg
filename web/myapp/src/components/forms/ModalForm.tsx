/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, notification } from 'antd';
import { FormProps } from 'antd/lib/form';
import { post } from '../../service/tools';
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
            title="新建管理员"
            okText="创建"
            cancelText="取消"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="vertical">
                <FormItem label="账号">
                    {getFieldDecorator('adminId', {
                        rules: [{ required: true, message: '请输入账号!' }],
                    })(<Input />)}
                </FormItem>
                <FormItem label="密码">
                    {getFieldDecorator('adminPassword', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(<Input />)}
                </FormItem>
                <FormItem
                    className="collection-create-form_last-form-item"
                    style={{ marginBottom: 0 }}
                >
                    {getFieldDecorator('role', {
                        initialValue: '1',
                    })(
                        <Radio.Group>
                            <Radio value="1">超级管理员</Radio>
                            <Radio value="2">普通管理员</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
});

class ModalForm extends Component {
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
            values.role = parseInt(values.role)
            values.deleteFlag = 0
            values.state = 0
            
            if (!err) {
                post({
                    url: 'http://localhost:8080/admin/create',
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
