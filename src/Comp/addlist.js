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
  //if(array === null){return array;}
  //var result = [array[0]];
  //for(var i = 1; i < array.length; i++){
  //  var item = array[i];
  //  var repeat = false;
  //  for (var j = 0; j < result.length; j++) {
  //    if (item[key] === result[j][key]) {
  //      repeat = true;
  //      break;
  //    }
  //  }
  //  if (!repeat) {
  //    result.push(item);
  //  }
  //}
  //return result;
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


  writeListData = () => {
    firebase.database().ref('/list').set(this.state.ex_list);
    console.log('LIST DATA SAVED');
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
      this.getListData();
  }



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