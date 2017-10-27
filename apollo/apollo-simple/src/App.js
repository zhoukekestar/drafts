import React, { Component } from 'react';
import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql } from 'react-apollo';

const Feed = ({ data }) => {

  if (data.networkStatus === 1) {
    return <p>loading...</p>;
  }

  if (data.error) {
    return <p>Error! {data.error.message}</p>;
  }

  console.log(data);
  return <p>{JSON.stringify(data)}</p>;

  // return (
  //   <ul>
  //     {data.feed.map((item, index) => {
  //       if (!item.repository) return <p>error</p>

  //       return <li key={index}>
  //         {item.repository.owner.login}/{item.repository.name}
  //         {item.repository && item.repository && item.repository.stargazers_count}
  //       </li>;
  //     })
  //     }
  //   </ul>
  // );
}

const FeedWithData = graphql(gql`
  query ($price: Float) {
    TestCrossSiteMboxAbility(price: $price) {
      price
    }
  }
`, {
  options: (props) => ({
    notifyOnNetworkStatusChange: true,
    variables: {
      price: 5,
    },
  })
})(Feed);

export default class App extends Component {
  createClient() {
    // Initialize Apollo Client with URL to our server
    return new ApolloClient({
      networkInterface: createNetworkInterface({
        // uri: 'http://httpbin.org/anything',
        uri: 'http://30.37.80.136:5000/graphql.json',
        // uri: 'https://modelx.alibaba.net/ability/preview.json',
      }),
    });
  }

  render() {
    return (
      // Feed the client instance into your React component tree
      <ApolloProvider client={this.createClient()}>
        <FeedWithData />
      </ApolloProvider>
    );
  }
}

