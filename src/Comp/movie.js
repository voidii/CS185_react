import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import config from './config';
import * as firebase from 'firebase';
import MovieCard from "./MovieCard.js";
import Popup from "reactjs-popup";
import axios from 'axios';
import "./movie.css";


if (!firebase.apps.length) {
    firebase.initializeApp(config)
} 

class MoviesList extends Component {
    constructor( props ){
        super( props );
        this.state = {
          query: '',
          ex_list: ['ALL', 'Watched', 'Wanna_Watch'],
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
      writeListData = () => {
        firebase.database().ref('/list').set(this.state.ex_list);
        console.log('LIST DATA SAVED');
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
      getListData = () => {
        let ref = firebase.database().ref('/list');
        ref.on('value', snapshot => {
          const list = snapshot.val();
          this.setState({
            ex_list: list,
          });
        });
        console.log('LIST DATA RETRIEVED');
    }
      
      componentDidMount() {
          this.getUserData();
          this.getListData();
      }
        
      componentDidUpdate(prevProps, prevState) {
    
          if (prevState !== this.state) {
            if(prevState.list !== this.state.list){
              this.getUserData();
              return;
            }
            else{
              this.writeUserData();
            }
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
      };
    
      addnewlist = (event) =>{
        let new_list = this.refs.new_list.value;
        this.setState({ ex_list: this.state.ex_list.concat(new_list)}, () => {
          this.writeListData();
        });
      }
      removeData = (item) => {
        const { movies } = this.state;
        const newState = movies.filter(data => {
          return data.IMDBID !== item.IMDBID;
        });
        this.setState({ movies: newState });
      }
    
    
      
      render() {
        const {query} = this.state;
        let ex_list = this.state.ex_list;
        const defaultOption = this.state.list;
        if(this.state.movies){
          return (  
                <div>
              <Dropdown options={ex_list } value={defaultOption} onChange={this.handleOnDropDownChange} placeholder="Select an option"></Dropdown>
              
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
                                    <button onClick={ () => this.removeData(item)}>Delete</button>
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
          else{
            return (  
                <Dropdown options={ex_list } value={defaultOption} onChange={this.handleOnDropDownChange} placeholder="Select an option"></Dropdown>
                );
          }
       }
    
}
export default MoviesList;