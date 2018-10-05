import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList, TouchableOpacity, Image, Platform,
} from 'react-native';
import {
  Container, Content, Card, CardItem, Body, Text, Button,
} from 'native-base';
import { SearchBar } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Spacer from './Spacer';

class RestaurantListing extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      restaurantData: [],
      location: null,
      error: null,
      errorMessage: null,
      currentLat: null,
      currentLong: null,
    };

    this.arrayholder = [];
  }

  componentDidMount = () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
        restaurantData: this.props.data.restaurantsList.restaurantList,
        loading: false,
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      currentLat: location.coords.latitude,
      currentLong: location.coords.longitude,
    });
    const sortByDistance = require('sort-by-distance');

    const opts = {
      yName: 'latitude',
      xName: 'longitude',
    };

    const origin = { longitude: this.state.currentLong, latitude: this.state.currentLat}
    const locationArrayData = [];
    for (let i = 0; i < this.props.data.restaurantsList.restaurantList.length; i += 1) {
      locationArrayData.push(this.props.data.restaurantsList.restaurantList[i]);
      locationArrayData[i]['longitude'] = this.props.data.restaurantsList.restaurantList[i].location.longitude;
      locationArrayData[i]['latitude'] = this.props.data.restaurantsList.restaurantList[i].location.latitude
    }
    // console.log(sortByDistance(origin, locationArrayData, opts));
    this.setState({ restaurantData: sortByDistance(origin, locationArrayData, opts) });

    this.arrayholder = this.props.data ? this.props.data.restaurantsList.restaurantList : [];
  };

  renderHeader = () => (
    <SearchBar
      placeholder="Search Restaurant..."
      lightTheme
      round
      onChangeText={text => this.searchFilterFunction(text)}
      autoCorrect={false}
    />
  );

  searchFilterFunction = (text) => {
    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ restaurantData: newData.length > 0 ? newData : this.state.restaurantData });
  };

  render = () => {
    const {
      loading, data,
    } = this.props;

    // Loading
    if (loading) return <Loading />;
    if (this.state.restaurantData.length === 0) return <Loading />;

    const keyExtractor = item => item.id;

    const onPress = item => Actions.restaurant({ match: { params: { id: String(item.id) } } });

    return (
      <Container>
        <Content padder>
          <FlatList
            numColumns={1}
            extraData={this.state.restaurantData}
            data={this.state.restaurantData}
            renderItem={({ item }) => (
              <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem cardBody>
                  <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                    <Image
                      source={{ uri: item.image_url }}
                      style={{
                        height: 100,
                        width: null,
                        flex: 1,
                        borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity>
                </CardItem>
                <CardItem cardBody>
                  <Body>
                    <Spacer size={10} />
                    <Text style={{ fontWeight: '800' }}>
                      {item.name}
                    </Text>
                    <Spacer size={15} />
                    <Button
                      block
                      bordered
                      small
                      onPress={() => onPress(item)}
                    >
                      <Text>
                          View Details
                      </Text>
                    </Button>
                    <Spacer size={5} />
                  </Body>
                </CardItem>
              </Card>
            )}
            keyExtractor={keyExtractor}
            ListHeaderComponent={this.renderHeader}
          />
          <Spacer size={20} />
        </Content>
      </Container>
    );
  }
}


export default RestaurantListing;
