import React, { Component } from 'react';
import axios from 'axios';
import {
    PopupboxManager,
    PopupboxContainer
} from 'react-popupbox';
import "./movie.css";


class Movie extends Component {
    state = {
        
    }
    
    getData(id){
        if(id === 1){
            axios.get(`http://www.omdbapi.com/?apikey=80b44c2c&i=tt7605074`)
              .then(res => {
                const data = res.data;
                this.setState( data );
              })
        }
        if(id === 2){
            axios.get(`http://www.omdbapi.com/?apikey=80b44c2c&i=tt4078856`)
              .then(res => {
                const data = res.data;
                this.setState( data );
              })
        }
        if(id === 3){
            axios.get(`http://www.omdbapi.com/?apikey=80b44c2c&i=tt0166924`)
              .then(res => {
                const data = res.data;
                this.setState( data );
              })
        }
        if(id === 4){
            axios.get(`http://www.omdbapi.com/?apikey=80b44c2c&i=tt0990372`)
              .then(res => {
                const data = res.data;
                this.setState( data );
              })
        }
        if(id === 5){
            axios.get(`http://www.omdbapi.com/?apikey=80b44c2c&i=tt10627720`)
              .then(res => {
                const data = res.data;
                this.setState( data );
              })
        }
        if(id === 6){
            axios.get(`http://www.omdbapi.com/?apikey=80b44c2c&i=tt1375666`)
              .then(res => {
                const data = res.data;
                this.setState( data );
              })
        }
        if(id === 7){
            axios.get(`http://www.omdbapi.com/?apikey=80b44c2c&i=tt0258463`)
              .then(res => {
                const data = res.data;
                this.setState( data );
              })
        }
        if(id === 8){
            axios.get(`http://www.omdbapi.com/?apikey=80b44c2c&i=tt0373074`)
              .then(res => {
                const data = res.data;
                this.setState( data );
              })
        }

    }
    openPopupbox(id) {
        let imge = (
            <div></div>
        )
        if(id === 1){
            this.getData(1)
            imge = (
                <img src="./movies/liulangqiqiu.jpg" alt="Italian Trulli"></img>
            )
        }
        if(id === 2){
            this.getData(2)
            imge = (
                <img src="./movies/xinmigong.jpg" alt="Italian Trulli"></img>
            )
        }
        if(id === 3){
            this.getData(3)
            imge = (
                <img src="./movies/muhelandao.jpg" alt="Italian Trulli"></img>
            )
        }
        if(id === 4){
            this.getData(4)
            imge = (
                <img src="./movies/jimodemoshushi.jpg" alt="Italian Trulli"></img>
            )
        }
        if(id === 5){
            this.getData(5)
            imge = (
                <img src="./movies/nezha.jpg" alt="Italian Trulli"></img>
            )
        }
        if(id === 6){
            this.getData(6)
            imge = (
                <img src="./movies/daomengkongjian.jpg" alt="Italian Trulli"></img>
            )
        }
        if(id === 7){
            this.getData(7)
            imge = (
                <img src="./movies/dieyingchongchong.jpg" alt="Italian Trulli"></img>
            )
        }
        if(id === 8){
            this.getData(8)
            imge = (
                <img src="./movies/gongfu.jpg" alt="Italian Trulli"></img>
            )
        }

        const content = (
          <div>
            
            <p className="quotes">{this.Year}</p>
            <p className="quotes">Dance like no one is watching.</p>
            <p className="quotes">And love like you've never been hurt.</p>
            <span className="quotes-from">― Mark Twain</span>
          </div>
        )
        PopupboxManager.open({ imge, content })
      }
    render() {
        return (
            <div>
                <div>
                  <button onClick={this.openPopupbox(5)}>Click</button>
                  <PopupboxContainer />
                </div>
                <div class="parent">
                    <div class = "child child-1">
                        <img onClick={this.openPopupbox(1)} class = "myImg" src="./movies/liulangqiqiu.jpg" alt = "overwatch" float = "center" width = "50%"></img>

                    </div>
                    <div class = "child child-1">
                        <img onClick={this.openPopupbox(2)} class = "myImg" src="./movies/xinmigong.jpg" alt = "overwatch" width = "50%"></img>
                    </div>
                    <div class = "child child-1">
                        <img onClick={this.openPopupbox(3)} class = "myImg" src="./movies/muhelandao.jpg" alt = "overwatch" width = "70%"></img>
                    </div>
                    <div class = "child child-2">
                        <img onClick={this.openPopupbox(4)} class = "myImg" src="./movies/jimodemoshushi.jpg" alt = "overwatch" width = "100%"></img>
                    </div>
                    <div class = "child child-2">
                        <img onClick={this.openPopupbox(5)} class = "myImg" src="./movies/nezha.jpg" alt = "overwatch" width = "80%"></img>
                    </div>
                    <div class = "child child-2">
                        <img onClick={this.openPopupbox(6)} class = "myImg" src="./movies/daomengkongjian.jpg" alt = "overwatch" width = "80%"></img>
                    </div>
                    <div class = "child child-2">
                        <img onClick={this.openPopupbox(7)} class = "myImg" src="./movies/dieyingchongchong.jpg" alt = "overwatch" width = "80%"></img>
                    </div>
                    <div class = "child child-2">
                        <img onClick={this.openPopupbox(8)} class = "myImg" src="./movies/gongfu.jpg" alt = "overwatch" width = "100%"></img>
                    </div> 
                </div>
            </div>
        );
    }
}

export default Movie;