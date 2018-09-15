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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss(id){
        // When we dissmiss => get the new list without selected id, update this list again

        const isNotId = item => item.objectId !== id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({list: updatedList});
    }

    render() {
        return (
            <div className="App">
                {this.state.list.map(item => {
                    return (
                        <div key={item.objectId}>
                            <span>
                                <a href={item.url}>{item.title}</a>
                            </span>
                            <span>{item.author}</span>
                            <span>{item.num_comments}</span>
                            <span>{item.points}</span>
                            <span>
                                <button
                                    onClick={() => this.onDismiss(item.objectId)}
                                >
                                    Dismiss
                                </button>
                            </span>
                        </div>
                    )
                })} ;
            </div>
        );
    }
}

export default App;