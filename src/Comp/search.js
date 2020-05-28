import React, { Component} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
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
      list: 'ALL',
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
          const depl = false;//用于id判断重复
          this.state.movies.map((item,index)=>{
            if(item.IMDBID == IMDBID){
                depl = true;
                console.warn( IMDBID )
            }
          })
          if(depl){
            this.setState({
              movies: this.state.movie,
              message: resultNotFoundMsg,
              loading: false,
            })
          }
          else{
            this.setState({
              movies: this.state.movies.concat({Title, Year, Poster, Director, IMDBID}),
              message: resultNotFoundMsg,
              loading: false,
            })
          }
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
      firebase.database().ref('/' + this.state.list).set(this.state.movies);
      console.log('DATA SAVED');
  }
    
  getUserData = () => {
      let ref = firebase.database().ref('/' + this.state.list);
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
    this.setState({ query: query, loading: true,}, () => {
      this.fetchSearchResult( query );
    });
  };

  handleOnDropDownChange = (event) => {
    const query = event.value;
    this.setState({ list: query });
    console.warn(this.state.list);
  };

  
  render() {
    const {query} = this.state;
    const options = [
      'ALL', 'Watched', 'Wanna_Watch'
    ];
    const defaultOption = this.state.list;
    console.warn('render:', this.state.list)
    //const [ movies ] = this.state.movies;
    return (  
      
      <div>
        <b>Input IMDB ID</b>
        <div class="search bar4">
            <form>
            <input
              className="search bar4"
              value={query}
              onChange={ this.handleOnInputChange }
              placeholder="input IMDB ID"
            />
                <button type="submit"></button>
            </form>
        </div>
        <Dropdown options={options} value={defaultOption} onChange={this.handleOnDropDownChange} placeholder="Select an option" />
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