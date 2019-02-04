import React, { Component } from 'react';
import './App.css';
import Button from './Utils'

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;

const largeColumn = {
    width: '40%',
}

const midColumn = {
    width: '30%',
}
const smallColumn = {
    width: '10%',
}
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

// Now we using composition attributes for Search component
const Search = ({ value, onChange, children }) => {
    return (
        <form>
            {children}
            <input type="text"
                   value={value}
                   onChange={onChange}
            />
        </form>
    )
}


const Table = ({ list, pattern, onDismiss }) => {
    return (
        <div className="table">
            {list.filter(isSearched(pattern)).map(item =>
                <div key={item.objectID} className="table-row">
                    <span style={largeColumn}>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span style={midColumn}>
                        {item.author}
                        </span>
                    <span style={smallColumn}>
                        {item.num_comments}
                        </span>
                    <span style={smallColumn}>
                        {item.points}
                        </span>
                    <span style={smallColumn}>
                            <Button
                                onClick={() => onDismiss(item.objectID)}
                                className='button-inline'
                            >
                                Dismiss
                            </Button>
                    </span>
                </div>)}
        </div>
    )
}

class App extends Component {
    constructor(props) {
        super(props);

        // create state
        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY,
        };

        this.setSearchTopStories = this.setSearchTopStories.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onDismiss = this.onDismiss.bind(this);
    }

    setSearchTopStories(result) {
        this.setState({ result });
    }

    onSearchChange(event) {
        // Set state
        this.setState({ searchTerm: event.target.value });
    }

    componentDidMount() {
        const { searchTerm } = this.state;
        let full_url = `${URL}${searchTerm}`
        fetch(full_url)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error)
    }

    onDismiss(id) {
        // When we dissmiss => get the new list without selected id, update this list again
        console.log(id);
        const isNotId = item => item.objectID !== id;
        const updatedList = this.state.result.hits.filter(isNotId);
        // when state was changed , render will be call
        console.log(updatedList);
        this.setState({
            result: {
                ...this.state.result,
                hits: updatedList,
            }
        });
    }

    render() {
        // firstly get searchTerm and list from current state
        console.log(this.state)
        const { searchTerm, result } = this.state
        if (!result) {
            return null;
        }
        ;
        // after that pass them to another components
        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        // pass parameter
                        value={searchTerm}
                        onChange={this.onSearchChange}
                    >
                        Search:
                    </Search>
                </div>
                {result &&
                    <Table
                        list={result.hits}
                        pattern={searchTerm}
                        onDismiss={this.onDismiss}
                    />
                }
            </div>
        );
    }
}

export default App;
