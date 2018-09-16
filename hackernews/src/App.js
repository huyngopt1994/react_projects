import React, {Component} from 'react';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectId: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectId: 1,
    },
];

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
    constructor(props) {
        super(props);

        // create state
        this.state = {
            list,
            searchTerm: '',
        };

        this.onSearchChange = this.onSearchChange.bind(this)
        this.onDismiss = this.onDismiss.bind(this);
        this.onClickme = this.onClickme.bind(this);
    }
    onSearchChange(event){
       // Set state
        this.setState({searchTerm: event.target.value });
    }

    onClickme(){
        alert('Click me ahihihi');
    }

    onDismiss(id){
        // When we dissmiss => get the new list without selected id, update this list again

        const isNotId = item => item.objectId !== id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({list: updatedList});
    }

    render() {
        const {searchTerm, list} = this.state
        return (
            <div className="App">
                <form>
                    <input value = { searchTerm} onChange={this.onSearchChange} name='name' type="text"/>
                    <br/>
                    <input type="age" type="text"/>
                    <br/>
                    <input type="gender" type="radio"/>

                </form>
                {list.filter(isSearched(searchTerm)).map(item => {
                    return (
                        <div key={item.objectId}>
                            <span   onClick={console.log('you already click on title')}>
                                <a href={item.url}>{item.title}</a>
                            </span>
                            <span onClick={this.onClickme}>{item.author}</span>
                            <span>{item.num_comments}</span>
                            <span>{item.points}</span>
                            <span>
                                <button
                                    onClick={() => this.onDismiss(item.objectId)}
                                >
                                    Dismiss
                                </button>
                            </span>
                            <h3>{this.state.searchTerm}</h3>
                        </div>

                    )
                })} ;
            </div>
        );
    }
}

export default App;
