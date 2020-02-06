import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Icon, Input, Layout } from 'antd';
import SimpleFooter from '../common/footer-simple/App';

const { Content } = Layout;

function Login(props) {

  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    setScrollHeight(document.documentElement.clientHeight)
    document.title = `登录`;
  }, [scrollHeight]);

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const { getFieldDecorator, getFieldError, isFieldTouched } = props.form;
  const usernameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  return (
    <Layout style={{background: '#fff', height: scrollHeight}}>
      <Content className="content">
        <div className="login-container">
          <div className="login-title">
            密码登录
          </div>
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' },
                { min: 6, message: "请输入6-20位字母或数字" },
                { max: 10, message: "请输入6-20位字母或数字" }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="username"
                />,
              )}
            </Form.Item>
            <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' },
                { min: 6, message: "请输入有效的密码！" }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox className="login-form-remember">记住我</Checkbox>)}
              <a className="login-form-forgot" href="/#">
                忘记密码
            </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
            </Button>
              <a href="/#">注册!</a>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <SimpleFooter />
    </Layout>
  );
}

export default Form.create({ name: 'Login' })(Login);