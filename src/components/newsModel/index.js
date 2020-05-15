import React, {PureComponent} from 'react';
import { Modal, Form, Input } from 'antd';

const {TextArea} = Input;

class NewsModel extends PureComponent {
  state = {
    visible: false,
    title: '',
    id: null  // 使用id判断是新增还是修改
  };

  showModal = (title, record, id) => {
    this.setState({
      visible: true,
      title,
      id
    }, ()=>{
      this.form.setFieldsValue(record);
    });

  };

  handleOk = () => {
    this.form.submit();
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  onFinish = values => {
    console.log(values);
    if (this.state.id) {
      this.props.dispatch({
        type: 'news/handleEditNews',
        payload: {...values, id: this.state.id}
      });
    } else {
      this.props.dispatch({
        type: 'news/handlePublishNews',
        payload: values
      });
    }
    this.setState({
      visible: false
    });
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <div>
        <Modal
          title={this.state.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确定"
          destroyOnClose={true}
          forceRender={true}
        >
          {/*表单*/}
          <Form ref={form=>this.form=form} labelCol={{span: 5}} wrapperCol={{span: 15}}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '标题不能为空!',
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="作者"
              name="author"
              rules={[
                {
                  required: true,
                  message: '作者不能为空!',
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="来源"
              name="source"
              rules={[
                {
                  required: true,
                  message: '来源不能为空!',
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[
                {
                  required: true,
                  message: '内容不能为空!',
                },
              ]}
            >
              <TextArea/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default NewsModel;
