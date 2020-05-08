import React, { Component, useState } from 'react';
import Zmage from 'react-zmage'

import './Overwatch.css';
class My_Overwatch extends Component {
    
    render() {
        return (
            <div>
                <div className="parent">
                    
                    <div className = "child child-1">
                        <a onClick={() => Zmage.browsing({ src:require('./pic/w1.png') })}><img className = "myImg" src={ require('./pic/w1.png') } alt = "overwatch" style = {{float:'center', width:'50%'}}/></a>
                    </div>
                    <div className = "child child-1">
                    <a onClick={() => Zmage.browsing({ src:require('./pic/w2.png') })}><img className = "myImg" src={ require('./pic/w2.png') } alt = "overwatch" style = {{float:'center', width:'50%'}}/></a>
                    </div>
                    <div className = "child child-1">
                    <a onClick={() => Zmage.browsing({ src:require('./pic/w3.png') })}><img className = "myImg" src={ require('./pic/w3.png') } alt = "overwatch" style = {{float:'center', width:'70%'}}/></a>
                    </div>
                    <div className = "child child-2">
                    <a onClick={() => Zmage.browsing({ src:require('./pic/w4.png') })}><img className = "myImg" src={ require('./pic/w4.png') } alt = "overwatch" style = {{float:'center', width:'100%'}}/></a>
                    </div>
                    <div className = "child child-2">
                    <a onClick={() => Zmage.browsing({ src:require('./pic/w5.png') })}><img className = "myImg" src={ require('./pic/w5.png') } alt = "overwatch" style = {{float:'center', width:'80%'}}/></a>
                    </div>
                    <div className = "child child-2">
                    <a onClick={() => Zmage.browsing({ src:require('./pic/w6.png') })}><img className = "myImg" src={ require('./pic/w6.png') } alt = "overwatch" style = {{float:'center', width:'80%'}}/></a>
                    </div>
                    <div className = "child child-2">
                    <a onClick={() => Zmage.browsing({ src:require('./pic/w7.png') })}><img className = "myImg" src={ require('./pic/w7.png') } alt = "overwatch" style = {{float:'center', width:'80%'}}/></a>
                    </div>
                    <div className = "child child-2">
                    <a onClick={() => Zmage.browsing({ src:require('./pic/w8.png') })}><img className = "myImg" src={ require('./pic/w8.png') } alt = "overwatch" style = {{float:'center', width:'100%'}}/></a>
                    </div>
                    <div className = "child child-2">
                    <a onClick={() => Zmage.browsing({ src:require('./pic/w9.png') })}><img className = "myImg" src={ require('./pic/w9.png') } alt = "overwatch" style = {{float:'center', width:'100%'}}/></a>
                    </div>
                    
        </div>

            </div>
        );
    }
}

export default My_Overwatch;