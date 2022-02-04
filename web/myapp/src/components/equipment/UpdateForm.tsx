/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, notification, Select } from 'antd';
import { FormProps } from 'antd/lib/form';
import { get, post } from '../../service/tools';
import umbrella from 'umbrella-storage';
const FormItem = Form.Item;
const { Option } = Select;

type CollectionCreateFormProps = {
    visible: boolean;
    onCancel: () => void;
    onCreate: () => void;
    ref: any;
    data: any;
    select: any[];
    handleSelect: () => any;
} & FormProps;

const CollectionCreateForm: any = Form.create()((props: CollectionCreateFormProps) => {
    const { visible, onCancel, onCreate, form, data, select, handleSelect } = props;
    const { getFieldDecorator } = form!;

    let items = [];
    for (let i = 0; i < (select ? select.length : 0); i++) {
        items.push(
            <Option key={select[i].id} value={select[i].id}>
                {select[i].conferenceName}
            </Option>
        );
    }

    return (
        <Modal
            visible={visible}
            title="修改设备信息"
            okText="提交"
            cancelText="取消"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="vertical">
                <FormItem label="设备ID">
                    {getFieldDecorator('equipmentId', {
                        rules: [{ required: true, message: '请输入设备号!' }],
                        initialValue: data ? data.equipmentId : '',
                    })(<Input />)}
                </FormItem>
                <FormItem label="设备版本">
                    {getFieldDecorator('equipmentVersion', {
                        rules: [{ required: true, message: '请输入版本号!' }],
                        initialValue: data ? data.equipmentVersion : '',
                    })(<Input />)}
                </FormItem>
                <FormItem
                    label="会议室"
                    className="collection-create-form_last-form-item"
                    style={{ marginBottom: 0 }}
                >
                    {getFieldDecorator('ConferenceRoom', {
                        rules: [{ required: true }],
                        initialValue: data ? data.conferenceRoom : 0,
                    })(
                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleSelect}>
                             <Option key={0} value={0}>
                                    不分配
                            </Option>
                            {items}
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="状态"
                    className="collection-create-form_last-form-item"
                    style={{ marginBottom: 0 }}
                >
                    {getFieldDecorator('state', {
                         rules: [{ required: true }],
                        initialValue: data ? String(data.state) : '0',
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

class UpdateForm extends Component<any, any> {
    // eslint-disable-next-line react/sort-comp
    state = {
        visible: false,
        data: {
            role: 1,
            state: 0,
            conferenceRoom: 0,
            equipmentId: '',
            equipmentVersion: '',
           
        },
        select:[]
    };
    form: any;

    handleSelect = (key: any) => {
        this.state.data.conferenceRoom = parseInt(key);
    };
    showModal = () => {
        get({
            url: 'http://localhost:8080/equipment/find?id=' + this.props.adminId,
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
            }
        });

        get({
            url: 'http://localhost:8080/conference/findall',
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
                    select: res.data,
                });
            }
        });

        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.form;
        form.validateFields((err: any, values: any) => {
            let mydata = this.state.data;
            mydata.state = parseInt(values.state);
            mydata.equipmentId = values.equipmentId;
            mydata.equipmentVersion = values.equipmentVersion;

            if (!err) {
                post({
                    url: 'http://localhost:8080/equipment/create',
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
                        this.props.finished();
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
                <a onClick={this.showModal}>修改</a>
                <CollectionCreateForm
                select={this.state.select}
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    data={this.state.data}
                    handleSelect={this.handleSelect}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default UpdateForm;
