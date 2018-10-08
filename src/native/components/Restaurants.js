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
      imageLoadedIndex: -1,
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
    //--sort and update data
    this.sortAndUpdateData(this.props.data.restaurantsList.restaurantList)
    // const sortByDistance = require('sort-by-distance');

    // const opts = {
    //   yName: 'latitude',
    //   xName: 'longitude',
    // };

    // const origin = { longitude: this.state.currentLong, latitude: this.state.currentLat };
    // const locationArrayData = [];
    // for (let i = 0; i < this.props.data.restaurantsList.restaurantList.length; i += 1) {
    //   locationArrayData.push(this.props.data.restaurantsList.restaurantList[i]);
    //   locationArrayData[i].longitude = this.props.data.restaurantsList.restaurantList[i].location.longitude;
    //   locationArrayData[i].latitude = this.props.data.restaurantsList.restaurantList[i].location.latitude;
    // }
    // // console.log('sortByDistance:', sortByDistance(origin, locationArrayData, opts));
    // this.setState({ restaurantData: sortByDistance(origin, locationArrayData, opts) });

    // this.arrayholder = this.props.data ? this.props.data.restaurantsList.restaurantList : [];
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
    //--sort and update data
    // this.sortAndUpdateData(newData)
    this.setState({ restaurantData: newData.length > 0 ? newData : this.state.restaurantData });
  };

  sortAndUpdateData = (dataArray) => {
    const sortByDistance = require('sort-by-distance');

    const opts = {
      yName: 'latitude',
      xName: 'longitude',
    };

    const origin = { longitude: this.state.currentLong, latitude: this.state.currentLat };
    const locationArrayData = [];
    for (let i = 0; i < dataArray.length; i += 1) {
      locationArrayData.push(dataArray[i]);
      locationArrayData[i].longitude = dataArray[i].location.longitude;
      locationArrayData[i].latitude = dataArray[i].location.latitude;
    }
    // console.log('sortByDistance:', sortByDistance(origin, locationArrayData, opts));
    this.setState({ restaurantData: sortByDistance(origin, locationArrayData, opts) });

    this.arrayholder = this.props.data ? dataArray : [];
  }

  render = () => {
    const {
      loading, data,
    } = this.props;

    const {
      restaurantData, imageLoadedIndex,
    } = this.state;

    // Loading
    if (loading) return <Loading />;
    if (restaurantData.length === 0) return <Loading />;

    const keyExtractor = item => item.id.toString();

    const onPress = item => Actions.restaurant({ match: { params: { id: String(item.id) } } });

    return (
      <Container>
        <Content padder>
          <FlatList
            numColumns={1}
            extraData={this.state}
            data={restaurantData}
            renderItem={({ item, index }) => (
              <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem cardBody>
                  <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                    <Image
                      ref={(o) => { this.imageView = o; }}
                      source={{ uri: imageLoadedIndex !== index ? item.image_url : 'http://samen.salamsch.com/mschool/wp-content/uploads/2018/06/16386.png' }}
                      defaultSource={{ uri: 'http://samen.salamsch.com/mschool/wp-content/uploads/2018/06/16386.png' }}
                      style={{
                        height: 100,
                        width: null,
                        flex: 1,
                        borderRadius: 5,
                        resizeMode: imageLoadedIndex === index ? 'contain' : null,
                      }}
                      onError={() => { this.setState({ imageLoadedIndex: index }); }}
                      // onError={() => { this.imageView.source = { uri: 'http://samen.salamsch.com/mschool/wp-content/uploads/2018/06/16386.png' }; }}
                    />
                  </TouchableOpacity>
                </CardItem>
                <CardItem cardBody>
                  <Body>
                    <Spacer size={10} />
                    <Text style={{ fontWeight: '800' }}>
                      {item.name}
                      {'\n'}
                      <Text style={{ fontWeight: '100', color: 'green' }}>
                        {item.distance ? item.distance.toFixed(2) : 0}
                        {' '}
                        m away from your location
                      </Text>
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
