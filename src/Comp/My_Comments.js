import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';
import './index.css';

let data = [
    {author:'bty',content:'悟空的自在极意功是真的厉害！！',date:'2019/2/1 下午4:00:05'},
    {author:'oppen',content:'世上只有妈妈好？爸爸呢？',date:'2019/2/1 下午3:04:05'}
  ];

class My_Comments extends Component {
    render() {
        return (
          <div>
            <RaisedButton label="Help"/> 
          </div>
        );
    }
}

ReactDOM.render(
    <CommentBox data={data}/>, 
    document.getElementById('root')
);