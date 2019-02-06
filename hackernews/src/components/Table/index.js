import React, { Component } from 'react';
import Button from '../Button'

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
            list, onDismiss
        } = this.props;
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
}

export default Table
