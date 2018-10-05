import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRestaurant } from '../actions/restaurants';

class RestaurantListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    restaurants: PropTypes.shape({}).isRequired,
    fetchRestaurant: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchRestaurant();

  /**
    * Fetch Data from API, saving to Redux
    */
   fetchRestaurant = () => {
    const { fetchRestaurant } = this.props;
    fetchRestaurant();
  }

  render = () => {
    const { Layout, restaurants, isLoading, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    return (
      <Layout
        restaurantId={id}
        loading={isLoading}
        data={restaurants}
      />
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurantReducer || {},
  isLoading: state.status.loading || false,
});

const mapDispatchToProps = {
  fetchRestaurant: getRestaurant,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListing);
