import React, {Component} from 'react';
import {View, Switch} from 'react-native';
import styles from './styles';

class Item extends Component {
  state = {switchValue: false};
  toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    this.setState({switchValue: value});
    //state changes according to switch
    //which will result in re-render the text
  };
  render() {
    // const {title, touch, color, item, number, date} = this.props;
    const switchValue = this.state;
    //console.log("Biometrik", switchValue)
    return (
      <View>
        <View style={styles().container}>
          <View>
            <Switch
              trackColor={{false: '#ededed', true: '#0077ef'}}
              thumbColor={switchValue ? '#fff' : '#0077ef'}
              onValueChange={this.toggleSwitch}
              value={this.state.switchValue}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Item;
