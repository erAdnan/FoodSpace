import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image } from 'react-native';
import {
  Container, Content, Card, CardItem, H3, Text, Left, Right, View,
} from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';

const RestaurantView = ({
  restaurantId,
  data,
  loading,
}) => {
  console.log('RestaurantView restaurant:', restaurantId);

  // Get this Recipe from all recipes
  let restaurant = null;
  if (restaurantId && data) {
    restaurant = data.restaurantsList.restaurantList.find(item => parseInt(item.id, 10) === parseInt(restaurantId, 10));
  }
  // restaurant not found
  if (!restaurant) return <Error content={ErrorMessages.error404} />;
  const keyExtractor = item => (item.id ? item.id.toString() : '1');
  return (
    <Container>
      <Content padder>
        <Image
          source={{ uri: restaurant.image_url ? restaurant.image_url : 'http://samen.salamsch.com/mschool/wp-content/uploads/2018/06/16386.png' }}
          style={{ height: 200, width: null, flex: 1 }}
          onError={() => { restaurant.image_url = 'http://samen.salamsch.com/mschool/wp-content/uploads/2018/06/16386.png'; }}
        />

        <Spacer size={25} />
        <H3>
          {restaurant.name}
        </H3>
        <Spacer size={15} />

        <FlatList
          numColumns={1}
          data={restaurant.menu_list}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6, paddingVertical: 6 }}>
              <CardItem header bordered>
                <Text>
                  Menu List
                </Text>
              </CardItem>
              <Card>
                <CardItem header bordered>
                  <Text>
                          Veg Items
                  </Text>
                </CardItem>
                {
                item.Veg
                  ? item.Veg.map(vegItem => (

                    <View style={{ flexDirection: 'column' }}>
                      <CardItem header>
                        <Text>
                          =>
                          {vegItem.dish_name ? vegItem.dish_name.toUpperCase() : ''}
                        </Text>
                      </CardItem>
                      <CardItem footer>
                        <Left>
                          <Text>
                            Price:
                            {vegItem.price ? vegItem.price : ''}
                          </Text>
                        </Left>
                        <Right>
                          <Text>
                            Rating:
                            {vegItem.rating ? vegItem.rating : ''}
                          </Text>
                        </Right>
                      </CardItem>
                    </View>
                  ))
                  : null
              }
              </Card>
              <Card>
                <CardItem header bordered>
                  <Text>
                          Non-Veg Items
                  </Text>
                </CardItem>
                {
                item.nonVeg
                  ? item.nonVeg.map(nonVegItem => (

                    <View style={{ flexDirection: 'column' }}>
                      <CardItem header>
                        <Text>
                          =>
                          {nonVegItem.dish_name ? nonVegItem.dish_name.toUpperCase() : ''}
                        </Text>
                      </CardItem>
                      <CardItem footer>
                        <Left>
                          <Text>
                            Price:
                            {nonVegItem.price ? nonVegItem.price : ''}
                          </Text>
                        </Left>
                        <Right>
                          <Text>
                            Rating:
                            {nonVegItem.rating ? nonVegItem.rating : ''}
                          </Text>
                        </Right>
                      </CardItem>
                    </View>
                  ))
                  : null
              }
              </Card>
            </Card>
          )}
          keyExtractor={keyExtractor}
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

RestaurantView.propTypes = {
  // restaurant: PropTypes.shape({}).isRequired,
  restaurantId: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default RestaurantView;
