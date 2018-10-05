import React from 'react';
import { Scene, Stack } from 'react-native-router-flux';

import DefaultProps from '../constants/navigation';

import RestaurantsContainer from '../../containers/Restaurants';
import RestaurantsComponent from '../components/Restaurants';
import RestaurantViewComponent from '../components/Restaurant';


const Index = (
  <Stack hideNavBar>

    <Stack>
      <Scene
        key="restaurants"
        title="Restaurants List"
        component={RestaurantsContainer}
        Layout={RestaurantsComponent}
        {...DefaultProps.navbarProps}
      />
    </Stack>
    <Stack>
      <Scene
        back
        clone
        key="restaurant"
        title="Restaurant Details"
        {...DefaultProps.navbarProps}
        component={RestaurantsContainer}
        Layout={RestaurantViewComponent}
      />
    </Stack>
  </Stack>
);

export default Index;
