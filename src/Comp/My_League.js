import React, { Component } from 'react';
import './League.css'

class My_League extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="item item-1">
                      <div style={{height:'100%'}}>   
                        <b>A Little About Me In League of Legend</b>
                        <br></br>
                        <br></br>
                        I am a main supp player, but I can carry in other positions too.<br></br>
                        I engjoy playing supp because I think it is fun to cc bunch of enemys and my teamates follow up, like in the video<br></br>
                        I am the Rakan in the video.<br></br>
                        I recorded the video because I think the scene is beautiful lol.<br></br>
                        <br></br>
                        <br></br>
                      </div> 
                    </div>
                    <div className="item item-2">
                        <b>A Little About My Favorite Player: The Shy</b>
                        <br></br>
                            <br></br>
                            He is the top laner from IG.<br></br>
                            He is the first world champion from LPL.<br></br>
                            He is known to be the best player without a doubt nowadays.<br></br>
                            Here is a video about him~<br></br>
                    </div>
                    <div class="item item-3"><iframe width="80%" height="315" src="https://www.youtube.com/embed/e9V65_mAarw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            <div class="item item-4"><iframe width="80%" height="315" src="https://www.youtube.com/embed/Y1GvvnmAHJM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            
        </div>
            </div>
        );
    }
}

export default My_League;