import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Row, Col,Form,Input,Radio,Select,Button,Card,Table,Icon, Popconfirm } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;



class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Input
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                            />
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '名称',
            dataIndex: 'name',
            width: '30%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'name')}
                />
            ),
        }, {
            title: '类型',
            dataIndex: 'age',
            align:'center'
        }, {
            title: '是否必传',
            dataIndex: 'isRequire',
            width:70,
            align:'center'
        },{
            title: '说明',
            dataIndex: 'address',
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    this.state.dataSource.length > 1 ?
                        (
                            <Popconfirm title="确定删除?" onConfirm={() => this.onDelete(record.key)}>
                                <a style={{display:'inline-block',textAlign:'center',width:'100%'}} href="javascript:;">删除</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.state = {
            dataSource: [{
                key: '0',
                name: '字段 0',
                age: '32',
                isRequire:'是',
                address: '说明. 0',
            }, {
                key: '1',
                name: '字段 1',
                age: '32',
                isRequire:'否',
                address: '说明说明. 1',
            }],
            count: 2,
        };
    }
    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
            }
        };
    }
    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `字段 ${count}`,
            age: 32,
            address: `说明说明 ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Button className="editable-add-btn" onClick={this.handleAdd}>新增</Button>
                <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
            </div>
        );
    }
}

class newInterface extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        let {getFieldsValue,validateFields} = this.props.form
        let {history} = this.props
        //console.log(getFieldsValue())
        validateFields((err, values) => {
            if (!err) {

                //axios.post('http://localhost:1234/api/customer/addUser',values)
                //    .then(d=>{
                //        if(d.code===0){
                //            history.push("/intention");
                //        }else{
                //            console.log(d.data)
                //        }
                //
                //    })
            }else{
                console.log(err)

            }
        });
    }
    componentDidMount(){

        //this.setState({
        //    customerData:data[0]
        //})

    }
    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 7 }
        };

        const { getFieldDecorator } = this.props.form;
        return(
            <div id="InterfaceList_add">
                <Card
                    type="inner"
                    title="新增数据接口"
                >
                    <FormItem
                        {...formItemLayout}
                        label="接口名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [ {
                                required: true, message: '请填写接口名称',
                            }],
                        })(
                            <Input  name="name" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="接口类型"
                    >
                        {getFieldDecorator('resType', {
                            rules: [ {
                                required: true, message: '请选择接口类型',
                            }],
                        })(
                            <RadioGroup>
                                <Radio value="15">JSON</Radio>
                                <Radio value="12">XML</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="业务类型"
                    >
                        {getFieldDecorator('businessType', {
                            rules: [ {
                                required: true, message: '请选择业务类型',
                            }],
                        })(
                            <Select name="businessType" style={{ width: '100%' }} >
                                <Option value="0">请选择</Option>
                                <Option value="1">微信推广</Option>
                                <Option value="2">老师 Referral</Option>
                                <Option value="3">顾问 Referral</Option>
                                <Option value="4">家长 Referral</Option>
                                <Option value="5">Walkin</Option>
                                <Option value="6">Callin</Option>
                                <Option value="7">Web-in</Option>
                                <Option value="8">地面市场活动</Option>
                                <Option value="9">其他机构合作</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="数据源"
                    >
                        {getFieldDecorator('dsName', {
                            rules: [ {
                                required: true, message: '请选择数据源',
                            }],
                        })(
                            <Select name="dsName" style={{ width: '100%' }} >
                                <Option value="0">请选择</Option>
                                <Option value="1">微信推广</Option>
                                <Option value="2">老师 Referral</Option>
                                <Option value="3">顾问 Referral</Option>
                                <Option value="4">家长 Referral</Option>
                                <Option value="5">Walkin</Option>
                                <Option value="6">Callin</Option>
                                <Option value="7">Web-in</Option>
                                <Option value="8">地面市场活动</Option>
                                <Option value="9">其他机构合作</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="表名称"
                    >
                        {getFieldDecorator('tblName', {
                            rules: [ {
                                required: true, message: '请填写表名称',
                            }],
                        })(
                            <Input  name="tblName" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公开类型"
                    >
                        {getFieldDecorator('openType', {
                            rules: [ {
                                required: true, message: '请选择公开类型',
                            }],
                            initialValue:'1'
                        })(
                            <RadioGroup>
                                <Radio value="1">内网</Radio>
                                <Radio value="2">外网</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="操作类型"
                    >
                        {getFieldDecorator('operationType', {
                            rules: [ {
                                required: true, message: '请选择操作类型',
                            }],
                            initialValue:'4'
                        })(
                            <RadioGroup>
                                <Radio value="1">增加</Radio>
                                <Radio value="2">删除</Radio>
                                <Radio value="3">更新</Radio>
                                <Radio value="4">查询</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="接口URL"
                    >
                        {getFieldDecorator('reqUrl', {
                            rules: [ {
                                required: true, message: '请填写接口URL',
                            }],
                        })(
                            <Input  name="reqUrl" />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{span:3}}
                        wrapperCol={ {span: 12} }
                        label="操作"
                    >
                        {getFieldDecorator('sqlStr', {
                            rules: [ {
                                required: true, message: '请填写操作',
                            }],
                        })(
                            <TextArea style={{height:'400px'}}  name="sqlStr" />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="协议方法"
                    >
                        {getFieldDecorator('reqMethod', {
                            rules: [ {
                                required: true, message: '请选择协议方法',
                            }],
                            initialValue:'1'
                        })(
                            <RadioGroup>
                                <Radio value="1">GET</Radio>
                                <Radio value="2">POST</Radio>
                                <Radio value="0">不限</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <Row>
                        <Col align="right" span={3}>入参：</Col>
                        <Col span={12} className="editTable">
                            <EditableTable />
                        </Col>
                    </Row>
                    <FormItem></FormItem>
                    <Row>
                        <Col align="right" span={3}>出参：</Col>
                        <Col span={12} className="editTable">
                            <EditableTable />
                        </Col>
                    </Row>
                    <FormItem
                        {...formItemLayout}
                        label="是否分页"
                    >
                        {getFieldDecorator('isPage', {
                            rules: [ {
                                required: true, message: '请选择是否分页',
                            }],
                            initialValue:'1'
                        })(
                            <RadioGroup>
                                <Radio value="1">是</Radio>
                                <Radio value="2">否</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="分页限制"
                    >
                        {getFieldDecorator('pageSize', {
                            rules: [ {
                                required: true, message: '请填写分页限制',
                            }],
                            initialValue:'100'
                        })(
                            <Input  name="pageSize" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="是否计数接口"
                    >
                        {getFieldDecorator('isCount', {
                            rules: [ {
                                required: true, message: '请选择计数接口',
                            }],
                            initialValue:'0'
                        })(
                            <RadioGroup>
                                <Radio value="1">是</Radio>
                                <Radio value="0">否</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                    >
                        {getFieldDecorator('remark', {
                            //rules: [],
                        })(
                            <TextArea  name="remark" />
                        )}
                    </FormItem>
                    <Row>
                        <Col align="center" span={12} className="subBtn">
                            <Button  onClick={this.handleSubmit} type="primary">保存</Button>
                            <Link to="/interface/list"><Button>取消</Button></Link>
                        </Col>
                    </Row>

                </Card>
            </div>

        )
    }
}

export default Form.create()(newInterface)