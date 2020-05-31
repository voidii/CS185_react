import React, { Component } from 'react';
import Home from './Home'
import My_League from './My_League'
import My_Overwatch from './My_Overwatch'
import My_MHW from './My_MHW'
import MoviesList from './movie'
import Test from './test'
import Search from './search'
import AddList from './addlist'

let data = [];

class body extends Component {
    
    displayContent = () => {
        
        if(this.props.activeTab === 1)
            return <Home/>
        else if(this.props.activeTab === 2)
            return <My_League/>
        else if(this.props.activeTab === 3)
            return <My_Overwatch/>
        else  if(this.props.activeTab === 4)
            return <My_MHW/>
        else  if(this.props.activeTab === 5)
            return <MoviesList/>
        else  if(this.props.activeTab === 6)
            return <Test/>
        else if (this.props.activeTab === 7)
            return <Search/>
        else    
            return <AddList/>
    }
    render() {
        return (
            this.displayContent()
        );
    }
}

export default body;