/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, notification, Select } from 'antd';
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
            title="新建设备"
            okText="创建"
            cancelText="取消"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="vertical">
                <FormItem label="设备ID">
                    {getFieldDecorator('equipmentId', {
                        rules: [{ required: true, message: '请输入设备号!' }],
                    })(<Input />)}
                </FormItem>
                <FormItem label="设备版本">
                    {getFieldDecorator('equipmentVersion', {
                        rules: [{ required: true, message: '请输入版本号!' }],
                    })(<Input />)}
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
            values.conferenceRoom = 0
            values.ip = "暂无数据"
            values.picture = "暂无数据"
            values.deleteFlag = 0
            values.state = 0
            
            if (!err) {
                post({
                    url: 'http://47.97.158.11:8803/equipment/create',
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
