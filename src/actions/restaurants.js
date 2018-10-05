
/**
  * Get getRestaurant
  */
export function getRestaurant() {

  return dispatch => new Promise(resolve => fetch('http://www.mocky.io/v2/5ac4842c2f00005600f5f9fb')
  .then((response) => response.json())
  .then((responseJson) => {
    // console.log("restaurnats list", responseJson)
    return resolve(dispatch({
      type: 'RESTAURANT_DATA',
      data: responseJson,
    }));
  })
  .catch((error) => {
    console.error(error);
  })).catch(e => console.log(e));
}
