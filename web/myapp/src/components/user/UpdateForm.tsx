/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import { Modal, Form, notification, Radio } from 'antd';
import { FormProps } from 'antd/lib/form';
import { get, post } from '../../service/tools';
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
        title="修改用户信息"
        okText="创建"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
    >
        <Form layout="vertical">
            <FormItem label="状态"
                    className="collection-create-form_last-form-item"
                    style={{ marginBottom: 0 }}
                >
                    {getFieldDecorator('state', {
                        initialValue: data?String(data.state):"0"
                    })(
                        <Radio.Group>
                            <Radio value="0">正常</Radio>
                            <Radio value="1">禁用</Radio>
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
            state:0,
        }
    };
    form: any;
    showModal = () => {
       
        get({
            url: 'http://localhost:8080/user/find?id='+this.props.id,
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
            mydata.state = parseInt(values.state)
            if (!err) {
                post({
                    url: 'http://localhost:8080/user/change',
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
