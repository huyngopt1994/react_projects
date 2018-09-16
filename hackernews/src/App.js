import React, {Component} from 'react';
import './App.css';

// Create list data sample
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
    {
        title: 'Jquery',
        url: 'https://github.com/reactjs/jquery',
        author: 'Huy Ngo',
        num_comments: 4,
        points: 7,
        objectId: 4,
    },
];

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Search extends Component {
    render() {
        const {value, onChange} = this.props;
        return (
            <form>
                <input type="text"
                       value={value}
                       onChange={onChange}
                />
            </form>
        )
    }
}

class Table extends Component {
    render() {
        const {list, pattern, onDismiss} = this.props;
        return (
            <div>
                {list.filter(isSearched(pattern)).map(item =>
                    <div key={item.objectId}>
                    <span>
                        <a href={item.url}>{item.title}</a>
                    </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
                        <span>
                        <button
                            onClick={() => onDismiss(item.objectId)}
                            type='button'
                        >
                            Dismiss
                        </button>
                    </span>
                    </div>)}
            </div>
        )
    }
}

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
    }

    onSearchChange(event) {
        // Set state
        this.setState({searchTerm: event.target.value});
    }


    onDismiss(id) {
        // When we dissmiss => get the new list without selected id, update this list again

        const isNotId = item => item.objectId !== id;
        const updatedList = this.state.list.filter(isNotId);
        // when state was changed , render will be call
        this.setState({list: updatedList});
    }

    render() {
        // firstly get searchTerm and list from current state
        const {searchTerm, list} = this.state
        // after that pass them to another components
        return (
            <div className="App">
                <Search
                    // pass parameter
                    value={searchTerm}
                    onChange={this.onSearchChange}
                />
                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>
        );
    }
}

export default App;
