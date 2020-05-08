import React, { Component } from 'react';

class Tab extends Component {
    addStyling = () => {
        if(this.props.tab.id == this.props.activeTab){
            return {backgroundColor: 'bisque'}
        }
        else{
            return {backgroundColor: 'rgb(243, 199, 163)'}
        }
    }
    render() {
        return (
            <div className = 'tab' 
            style = {this.addStyling()}
            onClick={this.props.changeTab.bind(this, this.props.tab.id)}
            >
                <h2>
                    {this.props.tab.title}
                </h2>
            </div>
        );
    }
}

export default Tab;