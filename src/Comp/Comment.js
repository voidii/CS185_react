import React, { Component } from 'react';

class Comment extends Component {
	handleSubmitUpdate(e) {
	    e.preventDefault();
	    let author = this.props.author,
	        content = this.refs.content.value,
	        date = this.props.date;
	    this.props.handleCommentUpdate(this.props.index, {author, content, date});
	}

	render() {
        let {content, author, date, editToggle} = {...this.props},
            editButton = editToggle ? '取消' : '编辑',
            contentDiv = editToggle ?
                <form className='editContent' onSubmit={(e) => this.handleSubmitUpdate(e)}>
                  <textarea defaultValue={content} ref="content"></textarea>
                  <button>完成</button>
                </form>
                    : 
                <div className='content'>{content}</div>;

        return (
	        <div className='comment'>
	            {contentDiv}
	            <div className='metadata'>
	              	<div className='author'>{author}</div>
	              	<div className='date'>{date}</div>
	              	<a className='option' href='#' onClick={this.props.handleEditToggle}>{editButton}</a>
	              	<a className='option' href='#' onClick={this.props.handleCommentDelete}>删除</a>
	            </div>
	        </div>
        );
    }
}

export default Comment;
