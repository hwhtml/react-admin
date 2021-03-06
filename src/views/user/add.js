import React, { Component } from 'react'
import { Form, Input, Icon, Button, message} from 'antd'
import { UsersAdd } from '../../api'


const FormItem = Form.Item;


class UserAddForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      confirmDirty: false,
      userInfo: {
        user_name: 'admin',
        password: '223232',
        user_mobile: '18397907788'
      }
    }
  }
  goBack = () => {
    this.props.history.goBack()
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  validatorPassword = (rule, value, callback) => {
    let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    let errMsg = '不少于6位,至少包含一个字母和一个数字!'
    if (!passwordReg.test(value)) {
      callback(errMsg)
    } else {
      callback()
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致，请重新输入密码!');
    } else {
      callback();
    }
  }

  validatorPhone = (rule, value, callback) => {
    let phoneReg = /^[1][3456789][0-9]{9}$/
    let errMsg = '手机号格式有误!'
    if (!phoneReg.test(value)) {
      callback(errMsg)
    } else {
      callback()
    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        UsersAdd(values).then( res => {
          if (res.code === 2000) {
            message.success(res.msg)
            this.props.history.push('/app/user/list')
          }
        })
      }
    });
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      }
    }

    return (
      <div className="page-main">
        <div className={'page-title'}>
          <h3>用户添加</h3>
        </div>
        <div className={'page-opr'}>
          <Button icon="arrow-left" onClick={this.goBack}>返回</Button>
        </div>
        <div className={'page-form'}>
          <Form className={'user-add-form'} style={{width: '500px'}}>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('user_name', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
            >
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码!' },
                  { validator: this.validatorPassword }
                ],
              })(
                <Input type={'password'} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="密码" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
            >
              {getFieldDecorator('confirm', {
                rules: [
                  { required: true, message: '请确认密码!' },
                  { validator: this.compareToFirstPassword}
                ]
              })(
                <Input type={'password'} onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="确认密码" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="电话号码"
            >
              {getFieldDecorator('user_mobile', {
                rules: [
                  { required: true, message: '请输入电话号码!' },
                  { validator: this.validatorPhone}
                ]
              })(
                <Input onBlur={this.handleConfirmBlur} prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="电话号码" />
              )}
            </FormItem>
            <FormItem
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
              }}
            >
              <Button onClick={this.handleSubmit} type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                添加
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}
const UserAdd = Form.create()(UserAddForm)

export default UserAdd