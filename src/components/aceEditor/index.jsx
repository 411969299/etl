import React, { Component } from 'react';
import { render } from 'react-dom';
import {Row, Col,Select,Button } from 'antd';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/ext/emmet';
import 'brace/mode/sh';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/eclipse';

const Option = Select.Option;

function onChange(newValue) {
    //console.log('change',newValue);
}

class aceEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode:'sh',
            theme:'monokai'
        }
    }
    changeMode = (e)=>{
        this.setState({
            mode:e
        });
    }
    changeTheme= (e)=>{
        this.setState({
            theme:e
        });
    }
    render() {
        return(
            <div id="AceEditor">
                <div className="aceEditor-menu">
                    <h3>语言</h3>
                    <Select defaultValue="sh" size="large" onChange={this.changeMode} style={{ width: '100%' }} >
                        <Option value="sh">sh</Option>
                        <Option value="javascript">javascript</Option>
                    </Select>
                    <h3>界面风格</h3>
                    <Select defaultValue="monokai" size="large" onChange={this.changeTheme} style={{ width: '100%' }} >
                        <Option value="monokai">monokai</Option>
                        <Option value="eclipse">eclipse</Option>
                    </Select>
                </div>
                <AceEditor
                    mode={this.state.mode}
                    theme={this.state.theme}
                    width="60%"
                    height="600px"
                    fontSize="14px"
                    onChange={onChange}
                    name="shell-edit"
                    enableBasicAutocompletion={true}
                    enableLiveAutocompletion={true}
                    enableSnippets={true}
                    editorProps={{$blockScrolling: true}}
                />
            </div>

        )
    }
}

export default aceEditor