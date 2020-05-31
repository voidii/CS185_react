import React, { Component} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import config from './config';
import * as firebase from 'firebase';
import axios from 'axios';
import "./movie.css";


if (!firebase.apps.length) {
    firebase.initializeApp(config)
} 
function uniqueArray(array, key){
  if(array === null){return array;}
  var result = [array[0]];
  for(var i = 1; i < array.length; i++){
    var item = array[i];
    var repeat = false;
    for (var j = 0; j < result.length; j++) {
      if (item[key] === result[j][key]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      result.push(item);
    }
  }
  return result;
}
function unique(arr){
  var newArr = [];
  var item;
  for(var i = 0, len = arr.length; i < len; i++){
    item = arr[i];
    if(newArr.indexOf(item) === -1){
      newArr.push(item);
    }
  }
  return newArr;
};





class AddList extends Component {
  //state 定义我们所需要的数据
  
  constructor( props ){
    super( props );
    this.state = {
      query: '',
      ex_list: ['ALL', 'Watched', 'Wanna_Watch'],
      list: 'ALL',
      movies: [],
      all_movies:[],
      loading: false,
      message: '',
      list_data:[],
      this_movie_list:[],
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
            all_movies: [{Title, Year, Poster, Director, IMDBID, }],
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
          this.writeALLData();
          this.getALLData();
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
            this.writeALLData();
            this.getALLData();
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
    uniqueArray(this.state.all_movies, 'Title')
    console.log(uniqueArray(this.state.all_movies, 'Title'));
    firebase.database().ref('/ALL').set(uniqueArray(this.state.all_movies, 'Title'));
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
          return;
        }
        if(prevState.all_movies !== this.state.all_movies){
          this.writeALLData();
          //this.writeMovieListData();
        }
        if(prevState.movies !== this.state.movies){
          this.writeUserData();
          //this.writeALLData();
          //this.writeMovieListData();
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


  
  render() {
    const {query} = this.state;
    let ex_list = this.state.ex_list;
    const defaultOption = this.state.list;
    console.warn('render:', this.state.list)
    console.warn('render:', this.state.movies)
        return (  
            <div>
            <b>Add New List</b>
            <div class="search bar4">
                <form onSubmit={ this.addnewlist }>
                <input
                  type = "text"
                  className="search bar4"
                  placeholder="input list ID"
                  ref='new_list'
                />
                    <button>Add</button>
                </form>
            </div>
            <Dropdown options={ex_list } value={defaultOption} placeholder="Select an option"></Dropdown>
            </div>
            
            
            )
      }
   }
 export default AddList;