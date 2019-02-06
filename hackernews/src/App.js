import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './App.css';
import Button from './components/Button'
import Search from './components/Search'
import { Table } from './components/Table'
import Loading from './components/Loading'

import { DEFAULT_HPP, DEFAULT_QUERY, PARAM_HPP, PARAM_PAGE, URL, } from './constants/index.js';


const withLoading = (Component) => ({ isLoading, ...rest }) =>
    isLoading
        ? <Loading/>
        : <Component {...rest}/>

const withError = (Component) => ({ error, ...rest }) =>
    error
        ? <div className="interactions">
            <p>Some thing went wrong.</p>
        </div>
        : <Component {...rest}/>

const ButtonWithLoading = withLoading(Button);
const TableHandlingError = withError(Table)

class App extends Component {

    constructor(props) {
        super(props);

        // create state
        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false,
        };
        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
        this.setSearchTopStories = this.setSearchTopStories.bind(this)
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.onDismiss = this.onDismiss.bind(this);
    }

    needsToSearchTopStories(searchTerm) {
        return !(this.state.results && this.state.results[searchTerm])
    }

    setSearchTopStories(result) {
        const { hits, page } = result;

        this.setState(prevState => {
            const { searchKey, results } = prevState;
            const oldHits = results && results[searchKey]
                ? results[searchKey].hits
                : [];

            const updatedHits = [
                ...oldHits,
                ...hits
            ]
            return ({
                results: {
                    ...results,
                    [searchKey]: { hits: updatedHits, page },

                },
                isLoading: false
            });
        })
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        this.setState({ isLoading: true });
        axios(`${URL}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(result => this.setSearchTopStories(result.data))
            .catch(error => this.setState({ error }))
    }

    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }
        event.preventDefault();
    }

    onSearchChange(event) {
        // Set state
        this.setState({ searchTerm: event.target.value });
    }

    componentDidMount() {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });
        this.fetchSearchTopStories(searchTerm);
    }


    onDismiss(id) {
        // When we dissmiss => get the new list without selected id, update this list again
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey];

        const isNotId = item => item.objectID !== id;
        const updatedList = hits.filter(isNotId);
        // when state was changed , render will be call
        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedList, page }
            }
        });
    }

    render() {
        // firstly get searchTerm and list from current state
        const { searchTerm, results, searchKey, error, isLoading } = this.state
        const page = (results && results[searchKey] && results[searchKey].page) || 0
        // after that pass them to another components
        const list = (
            results && results[searchKey] && results[searchKey].hits
        ) || [];
        console.log(this.state);
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
                <TableHandlingError
                    error={error}
                    list={list}
                    onDismiss={this.onDismiss}
                >
                </TableHandlingError>
                <div className="interactions">
                    <ButtonWithLoading
                        isLoading={isLoading}
                        onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
                    >
                        More
                    </ButtonWithLoading>
                </div>

            </div>
        );
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
}

Button.defaultProps = {
    className: '',
}

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number
        })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired
}

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node
}
export default App;

export {
    Button,
    Search,
    Table
}
