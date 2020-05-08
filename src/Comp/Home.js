import React, { Component } from 'react';
import './Home.css'
class Home extends Component {
    render() {
        return (
            <div>
            <div className = "home"> 
                <b>A Little About Me</b>
                <br></br>
                I am a Physics and Computer Science student.
                <br></br>
                I love playing League of Legend, Monster Hounter World, Overwatch, PUBG, WarcraftIII and a lot of others, too much to list
                <br></br>
                I also like boxing, basketball and working out. I am not just some nerds. I am the king of nerds.
            </div>

            <div classname="content">
                <img classname = "image" src={ require('./pic/Image.jpg') } style={{width: '75%', float: 'center'}}/>
            </div>
            </div>
        );
    }
}

export default Home;