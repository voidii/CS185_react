import React, { Component } from 'react';
import Popup from "reactjs-popup";
import axios from 'axios';

import "./movie.css";
import MovieCard from "./MovieCard.js";

class MoviesList extends React.Component {
    state = {
        moviesList: ['tt7605074',
        'tt4078856',
        'tt0166924',
        'tt0990372',
        'tt10627720',
        'tt1375666',
        'tt0258463',
        'tt0373074'],
        searchTerm: ''
    };

    search = event => {
        event.preventDefault();
        axios
            .get(
                `https://www.omdbapi.com/?apikey=80b44c2c&s=${
                    this.state.searchTerm
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                if (!res.Search) {
                    this.setState({ moviesList: [] });
                    return;
                }

                const moviesList = res.Search.map(movie => movie.imdbID);
                this.setState({
                    moviesList
                });
            });
    };

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    render() {
        const { moviesList } = this.state;

        return (
            <div class="parent">
                    <div class = "child child-1">
                        <Popup
                            trigger={<img class = "myImg" src={ require("./movies/liulangdiqiu.jpg") } alt = "overwatch" float = "center" width = "70%"></img>}
                            modal
                            closeOnDocumentClick
                        >
                            <span>
                                <img src={ require("./movies/liulangdiqiu.jpg") } alt = "overwatch" float = "left" width = "40%"></img> 
                                <div float = "right">
                                    <MovieCard movieID={'tt7605074'} key={'tt7605074'} />
                                </div>
                            </span>
                        </Popup>
                    </div>
                    <div class = "child child-1">
                    <Popup
                            trigger={<img class = "myImg" src={ require("./movies/xinmigong.jpg") } alt = "overwatch" width = "70%"></img>}
                            modal
                            closeOnDocumentClick
                        >
                            <span>
                                <img src={ require("./movies/xinmigong.jpg") } alt = "overwatch" float = "left" width = "40%"></img> 
                                <div float = "right">
                                    <MovieCard movieID={'tt4078856'} key={'tt4078856'} />
                                </div>
                            </span>
                    </Popup>
                        
                    </div>
                    <div class = "child child-1">
                    <Popup
                            trigger={<img class = "myImg" src={ require("./movies/muhelandao.jpg") } alt = "overwatch" width = "70%"></img>}
                            modal
                            closeOnDocumentClick
                        >
                            <span>
                                <img src={ require("./movies/muhelandao.jpg") } alt = "overwatch" float = "left" width = "40%"></img> 
                                <div float = "right">
                                    <MovieCard movieID={'tt0166924'} key={'tt0166924'} />
                                </div>
                            </span>
                    </Popup>
                        
                    </div>
                    <div class = "child child-2">
                    <Popup
                            trigger={<img class = "myImg" src={ require("./movies/shijimodemoshushi.jpg") } alt = "overwatch" width = "70%"></img>}
                            modal
                            closeOnDocumentClick
                        >
                            <span>
                                <img src={ require("./movies/shijimodemoshushi.jpg") } alt = "overwatch" float = "left" width = "40%"></img> 
                                <div float = "right">
                                    <MovieCard movieID={'tt0990372'} key={'tt0990372'} />
                                </div>
                            </span>
                    </Popup>
                        
                    </div>
                    <div class = "child child-2">
                    <Popup
                            trigger={<img class = "myImg" src={ require("./movies/nezha.jpg") } alt = "overwatch" width = "70%"></img>}
                            modal
                            closeOnDocumentClick
                        >
                            <span>
                                <img src={ require("./movies/nezha.jpg") } alt = "overwatch" float = "left" width = "40%"></img> 
                                <div float = "right">
                                    <MovieCard movieID={'tt10627720'} key={'tt10627720'} />
                                </div>
                            </span>
                    </Popup>
                        
                    </div>
                    <div class = "child child-2">
                    <Popup
                            trigger={<img  class = "myImg" src={ require("./movies/daomengkongjian.jpg") } alt = "overwatch"width = "70%"></img>}
                            modal
                            closeOnDocumentClick
                        >
                            <span>
                                <img src={ require("./movies/daomengkongjian.jpg") } alt = "overwatch" float = "left" width = "40%"></img> 
                                <div float = "right">
                                    <MovieCard movieID={'tt1375666'} key={'tt1375666'} />
                                </div>
                            </span>
                    </Popup>
                        
                    </div>
                    <div class = "child child-2">
                    <Popup
                            trigger={<img  class = "myImg" src={ require("./movies/dieyingchongchong.jpg") } alt = "overwatch" width = "70%"></img>}
                            modal
                            closeOnDocumentClick
                        >
                            <span>
                                <img src={ require("./movies/dieyingchongchong.jpg") } alt = "overwatch" float = "left" width = "40%"></img> 
                                <div float = "right">
                                    <MovieCard movieID={'tt0258463'} key={'tt0258463'} />
                                </div>
                            </span>
                    </Popup>
                        
                    </div>
                    <div class = "child child-2">
                    <Popup
                            trigger={<img  class = "myImg" src={ require("./movies/gongfu.jpg") } alt = "overwatch"  width = "70%"></img>}
                            modal
                            closeOnDocumentClick
                        >
                            <span>
                                <img src={ require("./movies/gongfu.jpg") } alt = "overwatch" float = "left" width = "40%"></img> 
                                <div float = "right">
                                    <MovieCard movieID={'tt0373074'} key={'tt0373074'} />
                                </div>
                            </span>
                    </Popup>
                        
                    </div> 
            </div>
        );
    }
}
export default MoviesList;