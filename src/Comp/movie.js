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
          limit:8,
          query: '',
          ex_list: ['ALL', 'Watched', 'Wanna_Watch'],
          list: 'ALL',
          movies: [],
          all_movies:[],
          wanted_movie:'',
          wanted_movie_res:'',
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
            if(this.state.all_movies === null){
              this.setState({
                all_movies: [{Title, Year, Poster, Director, IMDBID}],
                loading: false,
              })
            }
    
            if(this.state.movies === null)
            {
              this.setState({
                movies: [{Title, Year, Poster, Director, IMDBID}],
                all_movies: this.state.all_movies.concat({Title, Year, Poster, Director, IMDBID}),
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
                  all_movies: this.state.all_movies.concat({Title, Year, Poster, Director, IMDBID}),
                  message: resultNotFoundMsg,
                  loading: false,
                })
    
              }
          }
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

      writeALLData = () => {
        firebase.database().ref('/ALL').set(this.state.all_movies);
        console.log('ALL DATA SAVED');
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
      getALLData = () => {
        let all = firebase.database().ref('/ALL');
        all.on('value', snapshot => {
          const all_movies = snapshot.val();
          this.setState({
            all_movies: all_movies,
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
          this.getALLData();
      }
        
      componentDidUpdate(prevProps, prevState) {
    
          if (prevState !== this.state) {
            if(prevState.list !== this.state.list){
              this.getUserData();
            }
            if(prevState.all_movies !== this.state.all_movies){
              this.writeALLData();
            }
            if(prevState.movies !== this.state.movies){
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

      handleOnListChange = (event, Title, Year, Poster, Director, IMDBID) => {
        const the_list_add_to = event.value;
        
        let ref = firebase.database().ref('/' + the_list_add_to);
          ref.on('value', snapshot => {
            const movies = snapshot.val();
            if(movies === null){
              this.setState({
                movies: [{Title, Year, Poster, Director, IMDBID}],
                list: the_list_add_to
              });
            }
            else
            {
              this.setState({
                movies: movies.concat({Title, Year, Poster, Director, IMDBID}),
                list: the_list_add_to
              });
          }
          });
        //console.log(this.state.movies);
        //this.writeUserData();
        
      }
    
      addnewlist = (event) =>{
        let new_list = this.refs.new_list.value;
        this.setState({ ex_list: this.state.ex_list.concat(new_list)}, () => {
          this.writeListData();
        });
      }

      removeData = (item, Title, Year, Poster, Director, IMDBID) => {
        if(this.state.list === 'ALL'){
          
          for(let i = 0; i < this.state.ex_list.length; i++)
          {
            let index = -1;
            let ref = firebase.database().ref( this.state.ex_list[i]);
            ref.on('value', snapshot => {
              let list = snapshot.val();
              if(list === null){return;}
              for(let j =0; j < list.length; j++)
              {
                if(JSON.stringify(item) === JSON.stringify(list[j]))
                {
                  index = j;
                  break;
                }
              }
            
              
             
              if(index !== -1)
              {
                ref.child(index).remove();
              }
            });
          }
          
        }
        else
        {const { movies } = this.state;
        const newState = movies.filter(data => {
          return data.IMDBID !== item.IMDBID;
        });
        this.setState({ movies: newState });
      }}

      the_list_contain_this_movie = (item) => {
        let result = [];
        for(let i = 0; i < this.state.ex_list.length; i++)
        {
          let ref = firebase.database().ref('/' + this.state.ex_list[i]);
          ref.on('value', snapshot => {
            let list = JSON.stringify(snapshot.val());
            if(list === null){}
            else if(list.indexOf(JSON.stringify(item)) === -1)
            {
              result.push(this.state.ex_list[i]);
            }
          });
        }
        return result;
      }

      onLoadMore = (event) => {
        if((this.state.movies.length - this.state.limit) > 8)
        {
          this.setState({
            limit: this.state.limit + 8
          });
        }
        else{
          this.setState({
            limit: this.state.movies.length
          });
        }
      };

      set_searchMovie = (event) =>{
        this.setState({
          wanted_movie: event.target.value
        })
      }

      searchMovie = () => {
        let ref = firebase.database().ref('/ALL');
        ref.orderByChild("Title").equalTo(this.state.wanted_movie).on("child_added", snapshot => {
          this.setState({
            wanted_movie_res:snapshot.val()
          });
        });
      }

  
      

    
    
      
      render() {
        const {query} = this.state.wanted_movie;
        let ex_list = this.state.ex_list;
        const defaultOption = this.state.list;
        let result = [];
        let input = {};
        if(this.state.wanted_movie_res !== '' && this.state.wanted_movie !== ''){
          return (
            <div>
              <Dropdown options={ex_list } value={defaultOption} onChange={this.handleOnDropDownChange} placeholder="Select an option"></Dropdown>
            <div class="search bar4">
                <form>
                <input
                  type = "text"
                  id = "search"
                  className="search bar4"
                  value={query}
                  onChange={ this.set_searchMovie }
                  placeholder="input Movie Name"
                />
                {console.log(this.state.wanted_movie)}
                    <a herf="#" onClick={this.searchMovie}>Search</a>
                </form>
                </div>
                <Popup
                      trigger={<img class = "myImg" src = {this.state.wanted_movie_res.Poster} alt = "overwatch" float = "center" width = "50%"></img>}
                      modal
                      closeOnDocumentClick
                  >
                    <span>
                        <img src={this.state.wanted_movie_res.Poster} alt = "overwatch" float = "left" width = "40%"></img> 
                      
                        <Dropdown options={ [() => this.the_list_contain_this_movie(this.state.wanted_movie_res)] } value={defaultOption} placeholder="Select an option"></Dropdown>
                        <div float = "right">
                            <MovieCard movieID={this.state.wanted_movie_res.IMDBID} key={this.state.wanted_movie_res.IMDBID} />
                        </div>
                    </span>
                  </Popup>
            
            </div>
          );
        }
        else if(this.state.movies){
          if(this.state.list === 'ALL'){
            return (  
              <div className = "body">
            <Dropdown options={ex_list } value={defaultOption} onChange={this.handleOnDropDownChange} placeholder="Select an option"></Dropdown>
            <div class="search bar4">
                <form>
                <input
                  type = "text"
                  id = "search"
                  className="search bar4"
                  value={query}
                  onChange={ this.set_searchMovie }
                  placeholder="input Movie Name"
                />
                {console.log(this.state.wanted_movie)}
                    <a herf="#" onClick={this.searchMovie}>Search</a>
                </form>
            </div>
            <div className = "parent">
            
            { 
              this.state.movies.slice(0, this.state.limit).map(item => 
                
                <div>
                  <script>
                    {result = this.the_list_contain_this_movie(item)}
                  </script>
          
                <div className="child child-1">
                  
                  <Popup
                      trigger={<img class = "myImg" src = {item.Poster} alt = "overwatch" float = "center" width = "50%"></img>}
                      modal
                      closeOnDocumentClick
                  >
                    <span>
                        <img src={item.Poster} alt = "overwatch" float = "left" width = "40%"></img> 
                        <button onClick={ () => this.removeData(item, item.Title, item.Year, item.Poster, item.Director, item.IMDBID)}>Delete</button>
                        <Dropdown options={ result } value={defaultOption} onChange = {(e) => {this.handleOnListChange(e, item.Title, item.Year, item.Poster, item.Director, item.IMDBID)}} placeholder="Select an option"></Dropdown>
                        <div float = "right">
                            <MovieCard movieID={item.IMDBID} key={item.IMDBID} />
                        </div>
                    </span>
                  </Popup>
                </div>
                </div>
                )
            } 
            <span className = 'child child-2'>
              <div class="search bar4">
                { this.state.limit !== this.state.movies.length && <button onClick={this.onLoadMore}>Load</button>}
              </div>
            </span>
            </div>
            
            </div>
         );
          }
          else{
          return (  
                <div>
              <Dropdown options={ex_list } value={defaultOption} onChange={this.handleOnDropDownChange} placeholder="Select an option"></Dropdown>
              {console.log(this.state.list)}
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
        }
        else{
            return (  
                <Dropdown options={ex_list } value={defaultOption} onChange={this.handleOnDropDownChange} placeholder="Select an option"></Dropdown>
                );
        }
      }
    
}
export default MoviesList;