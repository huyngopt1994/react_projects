import React, { Component } from 'react';
import './App.css';
import Button from './Utils'

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '10';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage='
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

// Now we using composition attributes for Search component
const Search = ({ value, onChange, onSubmit, children }) => {
    return (
        <form onSubmit={onSubmit}>
            <input type="text"
                   value={value}
                   onChange={onChange}
            />
            <button type="submit">
                {children}
            </button>
        </form>
    )
}


const Table = ({ list, onDismiss }) => {
    return (
        <div className="table">
            {list.map(item =>
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
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.onDismiss = this.onDismiss.bind(this);
    }

    setSearchTopStories(result) {
        const { hits, page } = result;

        const oldHits = page === 0
            ? []
            : this.state.result.hits
        const updatedHits = [
            ...oldHits,
            ...hits
        ]
        this.setState({
            result: {
                hits: updatedHits, page
            }
        });
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        fetch(`${URL}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error)
    }

    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();
    }

    onSearchChange(event) {
        // Set state
        this.setState({ searchTerm: event.target.value });
    }

    componentDidMount() {
        const { searchTerm } = this.state;
        this.fetchSearchTopStories(searchTerm);
    }

    onDismiss(id) {
        // When we dissmiss => get the new list without selected id, update this list again
        const isNotId = item => item.objectID !== id;
        const updatedList = this.state.result.hits.filter(isNotId);
        // when state was changed , render will be call
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
        const page = (result && result.page) || 0
        // after that pass them to another components
        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        // pass parameter
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search
                    </Search>
                </div>
                {result &&
                <Table
                    list={result.hits}
                    onDismiss={this.onDismiss}
                />}
                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
                        More
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
