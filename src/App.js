import React from "react";
import { Link } from "react-router-dom";
import Routes from './routes';

import { Layout, Menu, Breadcrumb, Icon} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


let menucfg = [
    {
        link:'/interface/list',
        icon:'pie-chart',
        name:'数据接口管理'
    },
    {
        link:'/datasource/list',
        icon:'pie-chart',
        name:'数据源管理'
    },
    {
        link:'/interfaceType/list',
        icon:'pie-chart',
        name:'接口类型管理'
    },
    {
        link:'/app/list',
        icon:'pie-chart',
        name:'应用管理'
    },
    {
        link:'/server/list',
        icon:'pie-chart',
        name:'服务管理'
    },
    {
        link:'/doc/list',
        icon:'pie-chart',
        name:'接口文档管理'
    },
    {
        link:'/authority/list',
        icon:'pie-chart',
        name:'服务授权管理'
    },
    {
        link:'/log/list',
        icon:'pie-chart',
        name:'日志查询'
    },
    {
        link:'/menu/list',
        icon:'pie-chart',
        name:'菜单管理'
    },
    {
        link:'/warn/list',
        icon:'pie-chart',
        name:'报警管理'
    },
    {
        link:'/role/list',
        icon:'pie-chart',
        name:'角色管理'
    },
    {
        link:'/user/list',
        icon:'pie-chart',
        name:'用户管理'
    },
    {
        link:'/openSearch/pushToOpenSearch',
        icon:'pie-chart',
        name:'搜索引擎数据推送'
    },
    {
        link:'/openSearch/pushToOpenCustom',
        icon:'pie-chart',
        name:'自定义数据推送'
    },
    {
        link:'/home',
        icon:'pie-chart',
        name:'子节点',
        childs:[
            {
                link:'/home',
                icon:'pie-chart',
                name:'子节点测试'
            },{
                link:'/home',
                icon:'pie-chart',
                name:'子节点测试'
            },{
                link:'/home',
                icon:'pie-chart',
                name:'子节点测试'
            }
        ]
    }
]
class App extends React.Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>

                <Header  style={{ background: '#fff', padding: 0 }}>
                    <p>头部头部头部头部头部头部</p>
                </Header>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo"></div>
                        <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
                            {
                                menucfg.map(function(c,i){
                                    if(c.childs&&c.childs.length>0){
                                        return (
                                            <SubMenu
                                                key={i.toString()}
                                                title={<span><Icon type={c.icon} /><span>{c.name}</span></span>}
                                            >
                                                {
                                                    c.childs.map((cc,ii)=><Menu.Item key={i.toString()+'-'+ii.toString()}>{cc.name}</Menu.Item>)
                                                }

                                            </SubMenu>
                                        )
                                    }else{
                                        return (
                                            <Menu.Item key={i.toString()}>
                                                <Link to={c.link}>
                                                    <Icon type={c.icon} />
                                                    <span>{c.name}</span>
                                                </Link>
                                            </Menu.Item>
                                        )
                                    }
                                })
                            }

                        </Menu>
                    </Sider>
                    <Content style={{ margin: '0 16px' }}>

                        <div className="routesBack">
                            <Routes />
                        </div>


                    </Content>

                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                    思源集团 ©2018 Created by syswin 大数据部
                </Footer>

            </Layout>
        );
    }
}

//,backgroundColor:'#373D41'
export default App;