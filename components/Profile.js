import React, { Component } from  "react";
import  { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_VIEWER = gql`
  {
    viewer {
      name
      emailRecords {
        address
      }
    }
  }
`;

class Profile extends Component {
  render() {
    console.log(this.props);
    return (
      <h1>Profile</h1>
    );
  }
}

export default ( { viewer }) => {
  return (
    <Query query={GET_VIEWER}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>

        const { viewer } = data;
        return (
          <Profile viewer={viewer} />
        );
      }}
    </Query>
  );
}
