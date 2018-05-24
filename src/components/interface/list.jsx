import React, { Component } from 'react';
import {Row, Col,Form,Input,Select,Button,Card,Table,Pagination,Modal  } from 'antd';
import moment from 'moment';
import axios from '../../libs/axios'
import { Link } from "react-router-dom";

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;



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

            <Col  span={2} style={{textAlign:'right',lineHeight:'40px'}}>接口名称：</Col>
            <Col span={3}>
                <FormItem>
                    {getFieldDecorator('urlName', {})(
                        <Input  />
                    )}
                </FormItem>

            </Col>
            <Col  span={2} style={{textAlign:'right',lineHeight:'40px'}}>接口URL：</Col>
            <Col span={3}>
                <FormItem>
                    {getFieldDecorator('reqUrl', {})(
                        <Input  />
                    )}
                </FormItem>

            </Col>
            <Col  span={2} style={{textAlign:'right',lineHeight:'40px'}}>业务类型：</Col>
            <Col span={3}>
                <FormItem>
                    {getFieldDecorator('reqUrl', {
                        initialValue:''
                    })(
                        <Select name="businessType" style={{ width: '100%' }} >
                            <Option value="">--请选择--</Option>
                            <Option value="23">类型、渠道、版本服务</Option>
                            <Option value="22">北京资讯</Option>
                            <Option value="21">sfsdfsd</Option>
                            <Option value="19">sdfdsf</Option>
                            <Option value="18">测试服务类型啊</Option>
                            <Option value="17">测试读写</Option>
                            <Option value="16">楼盘信息</Option>
                        </Select>
                    )}
                </FormItem>

            </Col>
            <Col  span={2}>
                <Button type="primary" style={ { margin:'4px 0 0 10px'} } >搜索</Button>
            </Col>
        </Row>

    );
});


class CustomizedForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        //console.log(this.props)
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <div>
                <FormItem
                    {...formItemLayout}
                    label='接口名称：'
                >
                    {getFieldDecorator('name_m', {
                        rules: [ {
                            required: true, message: '请填写接口名称',
                        }],
                        initialValue:''
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='接口地址：'
                >
                    {getFieldDecorator('reqUrl_m', {
                        rules: [ {
                            required: true, message: '请填写接口地址',
                        }],
                        initialValue:''
                    })(
                        <Input type="password"/>

                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label='请求接口类型：'
                >
                    {getFieldDecorator('dbPassword_m', {
                        rules: [ {
                            required: true, message: '请选择请求接口类型',
                        }],
                        initialValue:''
                    })(
                        <Select  style={{ width: '100%' }} >
                            <Option value="">--请选择--</Option>
                            <Option value="12">XML</Option>
                            <Option value="15">JSON</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='请求示例：'
                >
                    {getFieldDecorator('reqEx_m', {
                        rules: [ {
                            required: true, message: '请填写请求示例',
                        }],
                        initialValue:''
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='测试连接：'
                >
                    {getFieldDecorator('dbDriver_m', {
                        initialValue:''
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='返回参数示例：'
                >
                    {getFieldDecorator('resParamEx_m', {
                        rules: [ {
                            required: true, message: '请填写返回参数示例',
                        }],
                        initialValue:''
                    })(
                        <TextArea/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='状态码说明：'
                >
                    {getFieldDecorator('code_m', {
                        initialValue:''
                    })(
                        <TextArea/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='接口说明：'
                >
                    {getFieldDecorator('remark_m', {
                        initialValue:''
                    })(
                        <TextArea/>
                    )}
                </FormItem>
            </div>

        )

    }
}

let ModelFrom = Form.create({
    mapPropsToFields(props) {
        //console.log(props)
        return {
            visible: Form.createFormField({
                ...props.visible
            }),
            confirmLoading:Form.createFormField({
                ...props.confirmLoading
            })
        };
    },
    onFieldsChange(props, changedFields) {
        console.log({props})
        console.log({changedFields})
        props.onChange(changedFields,props);
    },
})(CustomizedForm);



class interfaceList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            pagination: {
                total:0,
                current:1
            },
            loading: false,
            data: [],
            fields:{
                visible:{
                    value: false,
                },
                confirmLoading:{
                    value: false,
                }
            }
        }

    }
    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key:'id'
    }, {
        title: '接口名称',
        dataIndex: 'name',
        width:220,
        align:'center'
    }, {
        title: '接口URL',
        dataIndex: 'reqUrl',
        width:220,
        align:'center'
    }, {
        title: '接口类型',
        dataIndex: 'resTypeDesc',
        width:90,
        align:'center'
    }, {
        title: '业务类型',
        dataIndex: 'bussinessTypeDesc',
        align:'center'
    },
//    {
//    title: '创建时间',
//    dataIndex: 'createTime',
//},
        {
            title: '数据源',
            dataIndex: 'dsName',
            align:'center'
        }, {
            title: '管理',
            dataIndex: 'id',
            align:'center',
            render: text => {
                return (
                    <div className="selfBtn">
                        <Link to="/interface/add"><Button type="primary" size="small" ghost="true">修改</Button></Link>
                        <Button   size="small">删除</Button>
                        <Button type="primary" size="small" onClick={this.showModel}>添加文档</Button>
                    </div>

                )

            },
        }]
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

        this.setState({ loading: true });
        axios.get('http://localhost:8088/interface/ajax/list?_search=false&nd=1525426620128&pageSize=10&pageNo='+pager.current+'&sidx=&sord=asc')
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
    handleOk = ()=> {

        let changedFields = {
            confirmLoading: {
                value:true
            },
        }
        this.setState(({ fields }) => {
            return ({
                fields: { ...fields, ...changedFields },
            })
        });

        setTimeout(() => {
            this.setState({
                fields:{
                    visible:{
                        value:false
                    } ,
                    confirmLoading: {
                        value:false
                    },
                }
            });
        }, 2000);
    }
    handleCancel = ()=> {
        let changedFields = {
            visible:{
                value:false
            }
        }
        this.setState(({ fields }) => {
            return ({
                fields: { ...fields, ...changedFields },
            })
        });
    }
    showModel = ()=>{
        let changedFields = {
            visible:{
                value:true
            }
        }
        this.setState(({ fields }) => {
            console.log({fields: { ...fields, ...changedFields }})
            return ({
                fields: { ...fields, ...changedFields },
            })
        });
    }
    ModelFormChange = (changedFields,p)=>{
        //console.log(changedFields)
        //console.log(p)
    }
    render() {
        let fields = this.state.fields
        //console.log(fields)
        return(
            <div id="InterfaceList">
                <Card
                    type="inner"
                    title="数据接口管理"
                    extra={<Link to="/interface/add"><Button  type="primary" size="small">新增数据接口</Button></Link>}
                >
                    <SearchBox></SearchBox>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.data}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                        bordered
                    />
                </Card>
                <Modal title='新增接口文档'
                       visible={fields.visible.value}
                       onOk={this.handleOk}
                       confirmLoading={fields.confirmLoading.value}
                       onCancel={this.handleCancel}
                       width='650px'
                       style={{ top: 20 }}
                >

                    <ModelFrom {...fields}  onChange={this.ModelFormChange}/>

                </Modal>

            </div>

        )
    }
}

export default interfaceList