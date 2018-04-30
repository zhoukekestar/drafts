import React, { Component } from 'react';
import logo from './logo.svg';
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';
import mockNetworkInterface from './MockNetwork';

import './App.css';

const client = new ApolloClient({
  networkInterface: mockNetworkInterface,
});
const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const test = (a) => {
  console.log('tests', a);
}

const abc = gql;
console.log(channelsListQuery, abc);
test`abckkk`

const ChannelList = ({ data: { loading, error, channels}}) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return <ul>
      {channels.map(c => <li key={c.id}>{c.name}</li>)}
    </ul>;
}

const ChannelsListWithData = graphql(channelsListQuery)(ChannelList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Apollo</h1>
          </header>
          <ChannelsListWithData/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
