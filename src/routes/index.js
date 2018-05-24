/**
 * Created by niuyifei on 2018/04/02.
 */
import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import interfaceList from '../components/interface/list';
import interfaceAdd from '../components/interface/add';
import datasourceList from '../components/datasource/list';
import interfaceTypeList from '../components/interfaceType/list';
import appList from '../components/app/list';
import serverList from '../components/server/list';
import Home from '../components/home/index';
import docList from '../components/doc/list';
import authorityList from '../components/authority/list';
import logList from '../components/log/list';
import menuList from '../components/menu/list';
import warnList from '../components/warn/list';
import roleList from '../components/role/list';
import userList from '../components/user/list';
import pushToOpenSearch from '../components/openSearch/pushToOpenSearch';
import pushToOpenCustom from '../components/openSearch/pushToOpenCustom';
import editor from '../components/aceEditor/index';


export default class CRouter extends Component {

    render() {
        return (

                <Switch>
                    <Route exact path="/" component={interfaceList}/>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/interface/list" component={interfaceList}/>
                    <Route exact path="/interface/add" component={interfaceAdd}/>
                    <Route exact path="/datasource/list" component={datasourceList}/>
                    <Route exact path="/interfaceType/list" component={interfaceTypeList}/>
                    <Route exact path="/app/list" component={appList}/>
                    <Route exact path="/server/list" component={serverList}/>
                    <Route exact path="/doc/list" component={docList}/>
                    <Route exact path="/authority/list" component={authorityList}/>
                    <Route exact path="/log/list" component={logList}/>
                    <Route exact path="/menu/list" component={menuList}/>
                    <Route exact path="/warn/list" component={warnList}/>
                    <Route exact path="/role/list" component={roleList}/>
                    <Route exact path="/user/list" component={userList}/>
                    <Route exact path="/openSearch/pushToOpenSearch" component={pushToOpenSearch}/>
                    <Route exact path="/openSearch/pushToOpenCustom" component={pushToOpenCustom}/>
                    <Route exact path="/ui/editor" component={editor}/>
                    <Route render={() => <Redirect to="/404" />} />

                </Switch>

        )
    }
}