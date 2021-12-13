import React from 'react';
import './NotesManager.css'

export default class NotesManager extends React.Component {
	
	constructor(props){
		super(props);
		this.state={
			notesCount: 0,
			notes: [],
			note: {
				head: Date.now(),
			},
		};
	}

	componentDidMount () {
		fetch('http://basic?r=api/get-notes')
		    .then(response => response.json())
		    .then(json => {
		    	console.log(json);
		    	this.setState(() => {
		    		return {
		    			notes: json,
		    		};
		    	});
		    });
	}

	render(){
		return (
			<div className = {'NotesManager'}>
			    <h2>Менеджер Заметок</h2>  

			    <ul>
			       { this.state.notes.map((note) => {
			       	  return(
                          <li>{note.head}</li>
			       	  );
			       })}
			    </ul>
			    {/*<button 
			        onClick={() => {
			        	this.setState((prevState) => {
			        		return {
			        			notesCount: prevState.notesCount+1,
			        		}
			        	});
			        }}  
			    >Добавить</button>	*/}
			    <form
			        onSubmit = {(event) => {
			        	event.preventDefault();
			        	fetch('http://basic?r=api/save-note', {
			        		method: 'POST',
			        		body: JSON.stringify(this.state.note),
			        	})
			        	    .then(response => response.json())
			        	    .then(json => {
			        	     	console.log(json);
			        	     	this.setState(() => {
			        	     		return {
			        	     			notes: json,
			        	     		};
			        	     	});
			        	    });
			        }}
			    >
			         <input 
			             type={'text'} 
			             placeholder ={'название'}
			             onChange = {(event)=>{
			             	let field = event.target;
			             	let val = field.value;
			             	let note =this.state.note;
			             	note.head = val;
			             	this.setState(()=>{
			             		return{
			             			note: note,
			             		};
			             	});
			             }}
			             value = {this.state.note.head}
			         />
			         <br/> 
			         <textarea 
			             placeholder={'text'} 
			             rows = {8} >
			         </textarea>

			         <br/> <button>Сохранить</button>
			    </form>	    
			</div>
		);
	}

}