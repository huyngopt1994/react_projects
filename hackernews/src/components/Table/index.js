import React, { Component } from 'react';
import Button from '../Button'
import { sortBy } from 'lodash';

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_commnets').reverse(),
    POINTS: list => sortBy(list, 'points').reverse()
};
const largeColumn = {
    width: '40%',
}

const midColumn = {
    width: '30%',
}
const smallColumn = {
    width: '10%',
}

class Table extends Component {
    render() {
        const {
            list, onDismiss, sortKey, onSort
        } = this.props;
        return (
            <div className="table">
                <div className="table-header">
                    <span style={largeColumn}>
                        <Sort
                            sortKey={'TITLE'}
                            onSort={onSort}
                        >
                            Title
                        </Sort>
                    </span>
                    <span style={midColumn}>
                        <Sort
                            sortKey={'AUTHOR'}
                            onSort={onSort}
                        >
                            Author
                        </Sort>
                    </span>
                    <span style={smallColumn}>
                        <Sort
                            sortKey={'COMMENTS'}
                            onSort={onSort}
                        >
                            Comments
                        </Sort>
                    </span>
                    <span style={smallColumn}>
                        <Sort
                            sortKey={'POINTS'}
                            onSort={onSort}
                        >
                            Points
                        </Sort>
                    </span>
                </div>
                {SORTS[sortKey](list).map(item =>
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
}

class Sort extends Component {
    render() {
        const {
            sortKey, onSort, children
        } = this.props;
        return (
            <Button
                className="button-inline button-header"
                onClick={() => onSort(sortKey)}
            >
                {children}
            </Button>
        )
    }
}

export { Table }
