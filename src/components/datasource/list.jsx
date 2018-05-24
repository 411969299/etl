import React, { Component } from 'react';
import {Row, Col,Form,Input,Select,Button,Card,Table,Pagination,Modal  } from 'antd';
import axios from '../../libs/axios'
import { Link } from "react-router-dom";
import moment from 'moment';

const { TextArea } = Input;
const Option = Select.Option;
const FormItem = Form.Item;



const SearchBox = Form.create({
    onFieldsChange(props, changedFields) {
        //console.log({changedFields})
        //props.onChange(changedFields);
    },
    onValuesChange(_, values) {
    }
})((props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Row className="rowMargin" style={ { margin:'0 0 18px 0'} } >

            <Col  span={2} style={{textAlign:'right',lineHeight:'40px'}}>数据源名称：</Col>
            <Col span={3}>
                <FormItem>
                    {getFieldDecorator('urlName', {})(
                        <Input  />
                    )}
                </FormItem>

            </Col>
            <Col  span={2} style={{textAlign:'right',lineHeight:'40px'}}>数据库类型：</Col>
            <Col span={3}>
                <FormItem>
                    {getFieldDecorator('reqUrl', {
                        initialValue:''
                    })(
                        <Select name="businessType" style={{ width: '100%' }} >
                            <Option value="">--请选择--</Option>
                            <Option value="1">MySQL</Option>
                            <Option value="3">Impala</Option>
                            <Option value="2">MongoDB</Option>
                            <Option value="4">Hive</Option>
                        </Select>
                    )}
                </FormItem>

            </Col>
            <Col  span={2} style={{textAlign:'right',lineHeight:'40px'}}>数据库：</Col>
            <Col span={3}>
                <FormItem>
                    {getFieldDecorator('dbName', {})(
                        <Input name="dbName"  />
                    )}
                </FormItem>

            </Col>

            <Col  span={2}>
                <Button type="primary" style={ { margin:'4px 0 0 10px'} } >搜索</Button>
            </Col>
        </Row>

    );
});

const ModelForm = ''

class DataSource extends Component {
    constructor (props) {
        super(props)
        this.state = {
            pagination: {
                total:0,
                current:1
            },
            loading: false,
            data: [],
            ModalText: '对话框',
            ModalTitle: '',
            visible: false,
            confirmLoading: false
        }

    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '数据源名称',
            dataIndex: 'dsName',
            width: 200,
            align: 'center'
        }, {
            title: '数据源类型',
            dataIndex: 'dbType',
            width: 110,
            align: 'center',
            render: cellvalue => {
                let word = ''
                if (cellvalue == 1) {
                    word = "mysql"

                } else if (cellvalue == 2) {
                    word = "mongoDB"
                } else if (cellvalue == 3) {
                    word = "Impala"
                } else if (cellvalue == 4) {
                    word = "Hive"
                }
                return word


            },
        }, {
            title: '数据库',
            dataIndex: 'dbName',
            width: 180,
            align: 'center'
        }, {
            title: '数据源URL',
            dataIndex: 'dbUrl',
            width: 250,
            align: 'center'
        },
        {
            title: '数据源IP',
            dataIndex: 'dbIp',
            width: 130
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render: text => {
                let time = moment(text).format("MM-DD-YYYY");
                //console.log(time)
                return time
            },
            align: 'center'
        }, {
            title: '管理',
            dataIndex: 'id',
            align: 'center',
            render: text => {
                return (
                    <div className="selfBtn">
                        <Button type="primary" size="small" ghost="true"
                                onClick={this.addDataSource.bind(this,0,text)}>修改</Button><Button
                        size="small">删除</Button>
                    </div>

                )


            },
        }
    ];
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };

        pager.current = pagination.current;
        //this.setState({
        //    pagination: pager,
        //});
        this.getTableData(pager)

    }
    getTableData = (pager)=>{
        let pagination = { ...this.state.pagination };
        //console.log(pager)
        this.setState({ loading: true });
        axios.get('http://localhost:8088/datasource/ajax/list?_search=false&nd=1525426620128&pageSize=10&pageNo='+pager.current+'&sidx=&sord=asc')
            .then(d=>{
                if(d.code===0){

                    let kdata = d.data.data.map(function(c,i){
                        c.key = c.id+''
                        return c
                    })
                    pager.total =  d.data.count
                    //console.log(kdata)
                    this.setState({
                        data:kdata,
                        loading:false,
                        pagination:pager
                    })
                }else{
                    console.log(d.data)
                }

            })
    }
    componentDidMount=()=>{
        this.getTableData(this.state.pagination)
    }
    handleOk = () => {
        this.setState({
            ModalText: '加载完成之后关闭',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    addDataSource = (num,id)=>{
        let word = ''
        if(num===1){
            word = '新增数据源'
        }else if(num===0){
            word = '修改数据源'
            axios.post('http://localhost:8088/datasource/get',{id:id})
                .then(d=>{
                    if(d.code===0){
                        console.log(d)
                    }else{
                        console.log(d.data)
                    }

                })

        }
        //console.log(id)
        this.setState({
            visible: true,
            ModalTitle:word
        });
    }
    render() {
        const { visible, confirmLoading,ModalTitle,data,pagination,loading } = this.state;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        };

        return(
            <div id="DataSource">
                <Card
                    type="inner"
                    title="数据源管理"
                    extra={<Button  type="primary" size="small" onClick={this.addDataSource.bind(this,1)}>新增数据源</Button>}
                >

                    <SearchBox/>
                    <Table
                        columns={this.columns}
                        dataSource={data}
                        pagination={pagination}
                        loading={loading}
                        onChange={this.handleTableChange}
                        bordered
                    />
                </Card>
                <Modal title={ModalTitle}
                       visible={visible}
                       onOk={this.handleOk}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                       width='650px'
                       style={{ top: 20 }}
                >

                    <FormItem
                        {...formItemLayout}
                        label='数据源名称：'
                    >
                        {getFieldDecorator('dsName_m', {
                            rules: [ {
                                required: true, message: '请填写数据源名称',
                            }],
                            initialValue:''
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='数据源类型：'
                    >
                        {getFieldDecorator('dbType_m', {
                            rules: [ {
                                required: true, message: '请填写数据源类型',
                            }],
                            initialValue:''
                        })(
                            <Select  style={{ width: '100%' }} >
                                <Option value="">--请选择--</Option>
                                <Option value="1">MySQL</Option>
                                <Option value="3">Impala</Option>
                                <Option value="2">MongoDB</Option>
                                <Option value="4">Hive</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label='数据源密码：'
                    >
                        {getFieldDecorator('dbPassword_m', {
                            rules: [ {
                                required: true, message: '请填写数据源密码',
                            }],
                            initialValue:''
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='数据源IP：'
                    >
                        {getFieldDecorator('dbIp_m', {

                            initialValue:''
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='数据源驱动：：'
                    >
                        {getFieldDecorator('dbDriver_m', {
                            rules: [ {
                                required: true, message: '请填写数据源驱动',
                            }],
                            initialValue:''
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='数据库：'
                    >
                        {getFieldDecorator('dbName_m', {
                            initialValue:''
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='数据源端口：'
                    >
                        {getFieldDecorator('dbPort_m', {
                            initialValue:''
                        })(
                            <Input/>

                        )}
                        <a>测试连接</a>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='最小连接数数量：'
                    >
                        {getFieldDecorator('minSize_m', {
                            rules: [ {
                                required: true, message: '请填写最小连接数数量',
                            }],
                            initialValue:''
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='最大连接数数量：'
                    >
                        {getFieldDecorator('maxSize_m', {
                            rules: [ {
                                required: true, message: '请填写最大连接数数量',
                            }],
                            initialValue:''
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='初始化接数数量：'
                    >
                        {getFieldDecorator('initSize_m', {
                            rules: [ {
                                required: true, message: '请填写初始化接数数量',
                            }],
                            initialValue:''
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='备注：'
                    >
                        {getFieldDecorator('remark_m', {
                            initialValue:''
                        })(
                            <TextArea/>
                        )}
                    </FormItem>

                </Modal>
            </div>

        )
    }

}

// 可以把Model 做成 一个模块
export default Form.create()(DataSource)