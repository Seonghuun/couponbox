import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Component } from 'react';
 
class SearchScreen extends Component {
    render () {
      const {params} = this.props.route;
      const mapList = params ? params.mapList : null;


        return (
          <GooglePlacesAutocomplete
              placeholder='Search'
              onPress={(data, details = null) => {
                
                console.log(details);
                this.props.navigation.navigate('Map1', {region:        {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.0030,
                  longitudeDelta: 0.0040
                }})
                // 'details' is provided when fetchDetails = true
                // this.setState({region: 
                  // {
                  //   latitude: details.geometry.location.lat,
                  //   longitude: details.geometry.location.lng,
                  //   latitudeDelta: 0.0030,
                  //   longitudeDelta: 0.0040
                  // }
                // })
              }}
              query={{
                key: 'AIzaSyAlKslfpnRohoHZfp2Og86p9ZgIe_6IK7E',
                language: 'kr',
              }}
              predefinedPlaces={mapList}
              predefinedPlacesAlwaysVisible={true}

           />
          );
    }

};
 
export default SearchScreen;