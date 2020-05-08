import React, { Component } from 'react';
import './App.css'
import Tablist from './Comp/Tablist'
import Body from './Comp/body'
import TopJumper from './Comp/TopJumper'



class App extends Component {

  constructor(){
    super();
    this.state = {
        activeTab: 1
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }
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
        title: 'My Comments'
      }
    ]
    return (
      <div>
        <div className="header">
            <h2>CS185 Web Page</h2>
        </div>
        <div className = "navbar">
          <Tablist tabs={tabs}  
          changeTab={this.changeTab}
          activeTab={this.state.activeTab}
          />
          
        </div>
        <div className = "mainbody">
          <Body activeTab = {this.state.activeTab}/>
        </div>
        <div>
          <TopJumper/>
        </div>
      </div>
    );
  }
}

export default App;