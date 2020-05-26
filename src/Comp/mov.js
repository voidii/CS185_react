import React from 'react';

const Movie = props => {
  let movie = <h1>暂无数据</h1>;
  if(props.list.length) {
    movie = props.list.map((item, index) => {
      const { title, poster_path, vote_average } = item;
      const src = poster_path && `url(http://image.tmdb.org/t/p/w185${poster_path})`;
      return (
        <div className="Container"
             style={{ backgroundImage: src }}
             key={index}>
          <div className="VoteContainer">
            <span className="Vote">{vote_average}</span>
          </div>
         <div className="Bottom">
            <h3 className="Title">{title}</h3>
          </div>
        </div>
      )
    })
  }
  return movie;
}

//16.6版本中更新了一些包装函数
//其中 React.memo() 是一个高阶函数
//它与 React.PureComponent类似
//但是一个纯函数组件而非一个类
const Movies = React.memo(Movie);
export default Movies;