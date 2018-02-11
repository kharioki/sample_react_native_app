import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {Tabs} from './src/config/routes';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjcaa90on0cor0105rjbw2zfx' }),
  cache: new InMemoryCache()
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Tabs/>
            </ApolloProvider>
        );
    }
}

export default App;
