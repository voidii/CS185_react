import React, { Component } from 'react';
import config from './config';
import * as firebase from 'firebase';
import MovieCard from "./MovieCard.js";
import Popup from "reactjs-popup";
import axios from 'axios';
import { _search } from './utils';
import "./movie.css";


if (!firebase.apps.length) {
    firebase.initializeApp(config)
} 


class Search extends Component {
  //state 定义我们所需要的数据
  constructor( props ){
    super( props );
    this.state = {
      query: '',
      movies: [],
      loading: false,
      message: '',
    };
    this.cancel = '';
  }

  fetchSearchResult = ( query ) => {
    const searchUrl = `https://www.omdbapi.com/?apikey=80b44c2c&i=${
            query
        }&plot=full` ;
    if( this.cancel ){
      this.cancel.cancel();
    }

    this.cancel = axios.CancelToken.source();

    axios.get( searchUrl, {
      CancelToken: this.cancel.token
    } )
      .then( res => {
        const resultNotFoundMsg = ! res.data.Title.length
                                  ? 'there are no more result, plz try a new onw'
                                  :'';
        let Title = res.data.Title;
        let Year = res.data.Year;
        let Poster = res.data.Poster;
        let Director = res.data.Director;
        let IMDBID = query;
        if(this.state.movies === null)
        {
          this.setState({
            movies: [{Title, Year, Poster, Director, IMDBID}],
            message: resultNotFoundMsg,
            loading: false,
          })
        }
        else
        {
          this.setState({
            movies: this.state.movies.concat({Title, Year, Poster, Director, IMDBID}),
            message: resultNotFoundMsg,
            loading: false,
          })
      }
        console.warn( res.data )
      })
      .catch(error => {
        if(axios.isCancel(error) || error){
          this.setState({
            loading: false,
            message: 'failed to load data',
          })
        }
        console.warn( error )
      })
  };

  writeUserData = () => {
      firebase.database().ref('/movielist').set(this.state.movies);
      console.log('DATA SAVED');
  }
    
  getUserData = () => {
      let ref = firebase.database().ref('/movielist');
      ref.on('value', snapshot => {
        const movies = snapshot.val();
        this.setState({
          movies: movies,
        });
      });
      console.log('DATA RETRIEVED');
  }
  
  componentDidMount() {
      this.getUserData();
  }
    
  componentDidUpdate(prevProps, prevState) {
      // check on previous state
      // only write when it's different with the new state
      if (prevState !== this.state) {
        this.writeUserData();
      }
  }

  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query: query, loading: true, }, () => {
      this.fetchSearchResult( query );
    });
  }
  render() {
    const { query } = this.state;
    //const [ movies ] = this.state.movies;
    return (    
      <div>
        <input
          className="Search"
          value={query}
          onChange={ this.handleOnInputChange }
          placeholder="试着输入一些内容"
        />
        <div className = "parent">
        
          { 
            this.state.movies.map(item => 
              <div className="child child-1">
                <Popup
                            trigger={<img class = "myImg" src = {item.Poster} alt = "overwatch" float = "center" width = "50%"></img>}
                            modal
                            closeOnDocumentClick
                        >
                            <span>
                                <img src={item.Poster} alt = "overwatch" float = "left" width = "40%"></img> 
                                <div float = "right">
                                    <MovieCard movieID={item.IMDBID} key={item.IMDBID} />
                                </div>
                            </span>
                        </Popup>
              </div>
              )
          } 
        </div>
        </div>
     );
   }

 }
 export default Search;