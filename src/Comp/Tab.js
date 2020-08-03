import React, { Component } from 'react';
import './tab.css'
class Tab extends Component {
    addStyling = () => {
        if(this.props.tab.id === this.props.activeTab){
            return {
                backgroundColor: 'bisque'
            }
        }
        else{
            return {backgroundColor: 'rgb(243, 199, 163)'}
        }
    }
    render() {
        return (
            <ul className = 'tab' 
            style = {this.addStyling()}
            onClick={this.props.changeTab.bind(this, this.props.tab.id)}
            >
                <a>
                    <b>{this.props.tab.title}</b>
                </a>
            </ul>
        );
    }
}

export default Tab;