import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <h2>登录</h2>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入你的账号' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入你的密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住我</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    Or <a href="">注册</a>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class login extends Component {

    render() {
        return(
            <div id="Login">
                <div className="login-topbar">
                    <img src={require('../images/syswin_logo.png')} alt="Logo"/>
                    <div className="bar">
                        <Link to="/interface/list">首页</Link>
                    </div>
                </div>
                <div className="login-body">
                    <div className="MsgBox">
                        <h1>思源大数据</h1>
                        <h2>第三代数据服务接口平台 全新上线</h2>
                        <ul>
                            <li>10倍性能提升，多场景选择，最优性价比</li>
                            <li>维护更加方便 操作简单</li>
                            <li>新增数据推送功能 一站搞定全站数据</li>
                        </ul>
                    </div>
                    <div className="loginBox">
                        <WrappedNormalLoginForm />
                    </div>
                </div>
                <div className="clearDiv"></div>
                <div className="login-footer">
                    <ul className="login-footer-ul">
                        <li><a href="">关于思源大数据</a></li>
                        <li><a href="">联系我们</a></li>
                        <li><a href="">其他项目</a></li>
                        <li><a href="">链接链接</a></li>
                    </ul>
                    <div className="jieshao">
                        <ul  className="jieshao-ul">
                            <li><a href="">用户体验</a></li>
                            <li><a href="">产品运营</a></li>
                            <li><a href="">定制客户</a></li>
                            <li><a href="">移动与客户集成</a></li>
                            <li><a href="">云存储</a></li>
                            <li><a href="">内容与社交</a></li>
                            <li><a href="">安全</a></li>
                            <li><a href="">综合管理</a></li>
                            <li><a href="">全链路监控</a></li>
                        </ul>

                    </div>
                </div>
            </div>

        )
    }
}

export default login