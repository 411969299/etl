import React, { Component } from 'react';
import {Button,Card,Table } from 'antd';
import moment from 'moment';
import axios from '../../libs/axios'

const columns = [{
    title: 'ID',
    dataIndex: 'id',
}, {
    title: '接口名称',
    dataIndex: 'name',
}, {
    title: '接口URL',
    dataIndex: 'reqUrl',
}, {
    title: '接口类型',
    dataIndex: 'resTypeDesc',
}, {
    title: '业务类型',
    dataIndex: 'bussinessTypeDesc',
}, {
    title: '创建时间',
    dataIndex: 'createTime',
}, {
    title: '数据源',
    dataIndex: 'dsName',
}, {
    title: '管理',
    dataIndex: 'id',
    render: text => {
        return (
            <div>
                <Button>修改</Button><Button>删除</Button><Button>添加文档</Button>
            </div>

            )

    },
}];


class interfaceList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            pagination: {},
            loading: false,
            data: []
        }

    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        console.log(pager)
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });

    }
    getTableData = ()=>{
        this.setState({ loading: true });
        axios.get('http://localhost:8082/interface/ajax/list?_search=false&nd=1525426620128&pageSize=10&pageNo=2&sidx=&sord=asc')
            .then(d=>{
                if(d.code===0){
                    const pagination = { ...this.state.pagination };
                    console.log(pagination)
                    let kdata = d.data.data.map(function(c,i){
                         c.key = c.id
                        return c
                    })
                    console.log(kdata)
                    this.setState({
                        data:kdata,
                        loading:false,
                        pagination
                    })
                }else{
                    console.log(d.data)
                }

            })
    }
    componentDidMount=()=>{
        this.getTableData()
    }
    render() {
        return(
            <div id="InterfaceList">
                <Card
                    type="inner"
                    title="数据接口管理"
                    extra={<Button>新增数据接口</Button>}
                >
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                        bordered
                    />
                </Card>
            </div>

        )
    }
}

export default interfaceList