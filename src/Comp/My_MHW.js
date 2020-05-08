import React, { Component } from 'react';
import './HMW.css'
class My_MHW extends Component {
    render() {
        return (
            <div>
                <div className="container2">
                    <div className="itemm itemm-1">
                        <b>A Little About The Monsters In The Hunter World</b>
                    </div>
                    <div className="itemm itemm-2">
                        <a href = "https://monsterhunterworld.gamepedia.com/File:MHW_Ancient_Leshen_Icon.png">
                            <img src={ require('./pic/M1.png') } style = {{width: '60%'}}/>
                        </a>
                    </div>
                    <div className="itemm itemm-3">
                        <b>Ancient Leshen</b>
                        <br></br>
                        <br></br>
                        One of the hardest monster for starters. I personally have not even countered it yet. 
                        <br></br>
                        I wish one day I can get it. 
                    </div>
                    <div className="itemm itemm-4">
                        <a href = "https://monsterhunterworld.gamepedia.com/File:MHW_Anjanath_Icon.png">
                            <img src={ require('./pic/M2.png') } style = {{width: '60%'}}/>
                        </a>
                    </div>
                    <div className="itemm itemm-5">
                        <b>Anjanath</b>
                        <br></br>
                        <br></br>
                        A monster that most people would encounter in very early game, and most people quit the game because of this one. I didn't. I curshed it. 
                    </div>
                    <div className="itemm itemm-6">
                        <a href = "https://monsterhunterworld.gamepedia.com/File:MHW_Azure_Rathalos_Icon.png">
                            <img src={ require('./pic/M3.png') } style = {{width: '60%'}}/>
                        </a>
                    </div>
                    <div className="itemm itemm-7">
                        <b>Azure Rathalos</b>
                        <br></br>
                        <br></br>
                        The king of the sky, strongest Rathalos players will encounter before Iceborn. Really hard to take down with melee weapons. One of the reason why we always have at least one bow weapon. 
                    </div>
                    <div classNames="itemm itemm-8">
                        <a href = "https://monsterhunterworld.gamepedia.com/File:MHW_Xeno%27jiiva_Icon.png">
                            <img src={ require('./pic/M6.png') } style = {{width: '60%'}}/>
                        </a>
                    </div>
                    <div className="itemm itemm-9">
                        <b>Xeno'jiiva</b>
                        <br></br>
                        <br></br>
                        The strongest creature player will ever encounter before Iceborn, the final boss. The body of it is so huge that any other monster would look like an ant infront of it. Most players kill it with help from others. 
                    </div>
          </div>
            </div>
        );
    }
}

export default My_MHW;