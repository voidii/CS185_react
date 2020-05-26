import React, { Component } from 'react';
import config from './config';
import * as firebase from 'firebase';
import Movies from './mov';
import axios from 'axios';
import { _search } from './utils';


if (!firebase.apps.length) {
    firebase.initializeApp(config)
} 


class Search extends Component {
  //state 定义我们所需要的数据
  state = { 
    value: '',
    movies: null,
    loading: false
  }
  search = async val => {
    this.setState({ loading: true });
    const url = `https://www.omdbapi.com/?apikey=80b44c2c&i=${
        val
    }&plot=full`    
    const res = await _search(url);    
    const movies = res;
    this.setState({ movies, loading: false });
  };
  onChangeHandler = async e => {   
    this.search(e.target.value);
    this.setState({
      value: e.target.value
    })
  }
  get renderMovies() {    
    let movies = <h1>没有搜索结果</h1>
    if(this.state.loading) {
      movies = <h1>LOADING ...</h1>
    }
    if(this.state.movies) {
      movies = <Movies list={this.state.movies}></Movies>;
    }   
    return movies;
  }

  render() {
    return (    
      <div>
        <input
          className="Search"
          value={this.state.value}
          onChange={e => this.onChangeHandler(e)}
          placeholder="试着输入一些内容"
        />
        <div className="ContainerInner">
          {this.renderMovies}
        </div>
       </div>
     );
   }
 }
 export default Search;