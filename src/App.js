import React from "react";
import { Link } from "react-router-dom";
import Routes from './routes';

import { Layout, Menu, Breadcrumb, Icon,Switch } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


let menucfg = [
    {
        link:'/interface/list',
        icon:'api',
        name:'数据接口管理'
    },
    {
        link:'/datasource/list',
        icon:'database',
        name:'数据源管理'
    },
    {
        link:'/ui',
        icon:'area-chart',
        name:'UI/Tools',
        childs:[
            {
                link:'/editor',
                icon:'pie-chart',
                name:'编辑器'
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
    },
    {
        link:'/interfaceType/list',
        icon:'switcher',
        name:'接口/服务',
        childs:[
            {
                link:'/interfaceType/list',
                icon:'switcher',
                name:'接口类型管理'
            },
            {
                link:'/app/list',
                icon:'tool',
                name:'应用管理'
            },
            {
                link:'/server/list',
                icon:'shop',
                name:'服务管理'
            },
            {
                link:'/doc/list',
                icon:'book',
                name:'接口文档管理'
            },
            {
                link:'/authority/list',
                icon:'copy',
                name:'服务授权管理'
            }
        ]
    },

    {
        link:'/log/list',
        icon:'search',
        name:'日志查询'
    },
    {
        link:'/menu/list',
        icon:'appstore-o',
        name:'菜单管理'
    },
    {
        link:'/warn/list',
        icon:'notification',
        name:'报警管理'
    },
    {
        link:'/role/list',
        icon:'solution',
        name:'角色管理'
    },
    {
        link:'/user/list',
        icon:'team',
        name:'用户管理'
    },
    {
        link:'/openSearch/pushToOpenSearch',
        icon:'hdd',
        name:'搜索引擎数据推送'
    },
    {
        link:'/openSearch/pushToOpenCustom',
        icon:'coffee',
        name:'自定义数据推送'
    },

]
// 选中颜色 #00c1de
class App extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline',
        theme: 'light',
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    changeMode = (value) => {
        this.setState({
            mode: value ? 'vertical' : 'inline',
        });
    }
    render() {
        let header_p = {
            float:'right',
            color:'#fff'
        }
        return (
            <Layout style={{ minHeight: '100vh' }}>

                <Header  style={{ background: 'rgb(55, 61, 65)', padding:' 0 10px' }}>
                    <img src={require('./images/syswin_logo.png')} alt="Logo"/>
                    <p style={header_p}>欢迎您：admin &nbsp;&nbsp;|&nbsp;&nbsp;修改密码&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;退出&nbsp;&nbsp;&nbsp;&nbsp;</p>
                </Header>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo">
                            <Switch onChange={this.changeMode} />
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={['0']} mode={this.state.mode}>
                            {
                                menucfg.map(function(c,i){
                                    if(c.childs&&c.childs.length>0){
                                        return (
                                            <SubMenu
                                                key={i.toString()}
                                                title={<span><Icon type={c.icon} /><span>{c.name}</span></span>}
                                            >
                                                {
                                                    c.childs.map((cc,ii)=>{
                                                        return (
                                                            <Menu.Item key={i.toString()+'-'+ii.toString()}>
                                                                <Link to={c.link+cc.link}>
                                                                    <Icon type={cc.icon} />
                                                                    <span>{cc.name}</span>
                                                                </Link>
                                                            </Menu.Item>
                                                            )

                                                    })
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