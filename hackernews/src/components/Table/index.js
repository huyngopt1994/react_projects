import React, { Component } from 'react';
import Button from '../Button'
import classNames from 'classnames';
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
            list, onDismiss, sortKey, onSort, isSortReverse
        } = this.props;

        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse
            ? sortedList.reverse()
            : sortedList
        return (
            <div className="table">
                <div className="table-header">
                    <span style={largeColumn}>
                        <Sort
                            sortKey={'TITLE'}
                            onSort={onSort}
                            activateSortKey={sortKey}
                        >
                            Title
                        </Sort>
                    </span>
                    <span style={midColumn}>
                        <Sort
                            sortKey={'AUTHOR'}
                            onSort={onSort}
                            activateSortKey={sortKey}
                        >
                            Author
                        </Sort>
                    </span>
                    <span style={smallColumn}>
                        <Sort
                            sortKey={'COMMENTS'}
                            onSort={onSort}
                            activateSortKey={sortKey}
                        >
                            Comments
                        </Sort>
                    </span>
                    <span style={smallColumn}>
                        <Sort
                            sortKey={'POINTS'}
                            onSort={onSort}
                            activateSortKey={sortKey}
                        >
                            Points
                        </Sort>
                    </span>
                </div>
                {reverseSortedList.map(item =>
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
            sortKey, onSort, children, activateSortKey
        } = this.props;
        const sortClass = classNames(
            'button-inline',
            { 'button-active': sortKey === activateSortKey }
        );

        return (
            <Button
                className={sortClass}
                onClick={() => onSort(sortKey)}
            >
                <i className="fas fa-sort-down">{children}</i>
            </Button>
        )
    }
}

export { Table }
