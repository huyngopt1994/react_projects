import React, { Component } from 'react';
import { DEFAULT_HPP } from '../../constants'
import './index.css'
class Search extends Component {
    componentDidMount() {
        if (this.input) {
            this.input.focus();
        }
    }

    render() {
        const {
            value,
            onChange,
            onSubmit,
            children
        } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    ref={(node) => {
                        this.input = node;
                    }}
                />
                <button type="submit">
                    {children}
                </button>
                <input className='showInfo' type="text"
                       value={DEFAULT_HPP}
                />
            </form>);
    }
}

export default Search
