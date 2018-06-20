import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { mapIndexed} from '../../helpers'
require('./styles.scss')

const styles = {
  customWidth: {
    width: 200,
  },
};

export default class DropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  handleChange = (event, index, value) => {
      this.setState({value, 'content': this.props.items[index].content})
    };

  render() {
    return (
      <div>
        <DropDownMenu className="dropdown-class" value={this.state.value} onChange={this.handleChange}>
        {
            mapIndexed((x, itr) => {
                return <MenuItem label="Contact" key={itr} value={itr} primaryText={x.title}/>
            })(this.props.items)
        }
        </DropDownMenu>
        <br/>
        {
            this.state.content
        }
      </div>
    );
  }
}