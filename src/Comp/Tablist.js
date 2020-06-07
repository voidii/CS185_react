import React, { Component } from 'react';
import Tab from './Tab'

class Tablist extends Component {
    render() {
        const tabs = [
            {
              id: 1,
              title: 'Home'
            },
            {
              id: 2,
              title: 'My League'
            },
            {
              id: 3,
              title: 'My Overwatch'
            },
            {
              id: 4,
              title: 'My MHW'
            },
            {
              id: 5,
              title: 'My Movies'
            },
            {
              id: 6,
              title: 'My Comments'
            },
            {
              id: 7,
              title: 'Add Movies'
            },
            {
              id: 8,
              title: 'Add List'
            },
            {
              id: 9,
              title: 'Movie Links'
            },
          ]
        return tabs.map((indTab) => (
            <Tab tab = {indTab} 
            changeTab={this.props.changeTab}
            activeTab = {this.props.activeTab}/>

        ));
    }
}

export default Tablist;