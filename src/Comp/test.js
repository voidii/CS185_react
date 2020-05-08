import React, { Component } from 'react';
import config from './config';
import * as firebase from 'firebase';


if (!firebase.apps.length) {
    firebase.initializeApp(config)
 } 
class Test extends Component {
    constructor(){
        super();
        this.state = {
            messages: []
        }
    }
    writeUserData = () => {
        firebase.database().ref('/message').set(this.state);
        console.log('DATA SAVED');
    }
      
    getUserData = () => {
        let ref = firebase.database().ref('/message');
        ref.on('value', snapshot => {
          const state = snapshot.val();
          this.setState(state);
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
    render() {
        const { messages } = this.state;
        return(
          <div className="comment-box">
            <div className='comment'>
              <div >
              { 
                messages.map(developer => 
                  <div>
                    <div className="editContent">
                      {developer.view && <div className="content">{ developer.message }</div>}
                      <div className='metadata'>
	              	      <div className='author'>{developer.name}</div>
                        <div className='author'>{developer.des}</div>
	              	      <div className='date'>{developer.date}</div>
	              	      <a className='option' href='#' onClick={ () => this.removeData(developer)}>Delete</a>
	              	      <a className='option' href='#' onClick={ () => this.updateData(developer)}>Edit</a>
	                  </div>
                    </div>
                  </div>
                  )
              } 
              </div>
            </div>
            <div className='comment-box'>
              <div className='col-xl-12'>
                <form className='submitform' onSubmit={ this.handleSubmit }>
                <span className='warning' ref='warning'></span>
                    <input type='hidden' ref='uid' />
                    <div className='form-row'>
                        <input type="text" placeholder='Name' ref='name'/>
                    </div>
                    <div className='form-row'>
                        <input type="text" placeholder='Description' ref='des'/>
                    </div>
                    <div className='form-row'>
                        <input type="text" placeholder='Do you want your message to be private?(Yes/No)' ref='view'/>
                    </div>
                    <div className='form-row'>
                        <textarea placeholder='Message' ref='message'></textarea>
                    </div>
                    <div className='form-row'>
                        <input type="text" placeholder='Email' ref='Email'/>
                    </div>
                    <div className='form-row'>
                        <button>Post</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
      
      handleSubmit = (event) => {
        event.preventDefault();
        let name = this.refs.name.value;
        let message = this.refs.message.value;
        let uid = this.refs.uid.value;
        let des = this.refs.des.value;
        let view = this.refs.view.value;
        let Email = this.refs.Email.value;
        let date = new Date().toLocaleString();
        let warning = this.refs.warning;

        if(!(name.length < 20 && name.length > 5)) {
          warning.innerHTML = '*Name must be longer than 5 characters, less than 20';
          return null;
        }else if(!(des.length < 100) && des.length !== 0) {
          warning.innerHTML = '* Describption must be less than 100 character';
          return null;
        }else if(!(message.length < 500 && message.length > 15)) {
          warning.innerHTML = '* Message must be longer than 15 characters, less than 500 characters';
          return null;
        }else 
        {
          warning.innerHTML = '';
        }
      
        if (uid && name && message){
          const { messages } = this.state;
          const devIndex = messages.findIndex(data => {
            return data.uid === uid 
          });
          messages[devIndex].name = name;
          messages[devIndex].message = message;
          messages[devIndex].date = date;
          messages[devIndex].des = des;
          messages[devIndex].Email = Email;
          if(view === "Yes"){
            messages[devIndex].view = true;
          }
          this.setState({ messages });
        }
        else if (name && message ) {
          const uid = new Date().getTime().toString();
          const { messages } = this.state;
          messages.push({ uid, name, message,date,des,view,Email })
          this.setState({ messages });
        }
      
        this.refs.name.value = '';
        this.refs.message.value = '';
        this.refs.uid.value = '';
        this.refs.des.value = '';
        this.refs.view.value = '';
        this.refs.Email.value = '';

      }
      
      removeData = (developer) => {
        const { messages } = this.state;
        const newState = messages.filter(data => {
          return data.uid !== developer.uid;
        });
        this.setState({ messages: newState });
      }
      
      updateData = (developer) => {
        this.refs.uid.value = developer.uid;
        this.refs.name.value = developer.name;
        this.refs.message.value = developer.message;
        this.refs.view.value = developer.view;
        //this.refs.date.value = developer.date;
      }
       
    }

export default Test;