import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './redux-react-example/store';
import { fetchUser } from './redux-react-example/actions/userActions';
import { fetchTweets } from './redux-react-example/actions/tweetsActions';

const app = document.getElementById('app');

// first parameter map to props

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets
  }
})
class Layout extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  fetchTweets() {
    this.props.dispatch(fetchTweets()); 
  }

  render() {
    const { user, tweets } = this.props;
    if (!tweets.length) {
      return <button onClick={this.fetchTweets.bind(this)}>Load</button>;
    }
    const mappedTweets = tweets.map(tweet => <li key={tweet.id}>{tweet.text}</li>);
    return (
      <div>
        <h1>{user.name}</h1>
        <ul>
          {mappedTweets}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>
  ,app);
