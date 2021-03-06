import React from 'react';

import { Flex, Text } from 'rebass';
import { Content, Card } from '@workshop/ui';

import { useLazyLoadQuery, graphql } from 'react-relay';

import { AppQuery } from './__generated__/AppQuery.graphql';

const App = () => {
  const response = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        posts(first: 10) {
          edges {
            node {
              id
              content
            }
          }
        }
      }
    `,
    {},
    {
      fetchPolicy: 'network-only',
    },
  );

  const { posts } = response;

  return (
    <Content>
      <Flex flexDirection='column'>
        <Text>Posts</Text>
        <Flex flexDirection='column'>
          {posts.edges.map(({ node }) => (
            <Card mt='10px' flexDirection='column' p='10px' key={node}>
              <Text>id: {node.id}</Text>
              <Text>content: {node.content}</Text>
            </Card>
          ))}
        </Flex>
      </Flex>
    </Content>
  );
};

export default App;
