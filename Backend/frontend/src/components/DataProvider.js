import React, { Component } from "react";
import PropTypes from "prop-types";
import config from '../config'

class DataProvider extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    otherparam: PropTypes.string
  };

  state = {
    data: [],
    loaded: false,
    placeholder: "Loading...."
  };

  componentDidMount() {
    let path = ''
    if (this.props.otherparam){
      let otherParam = encodeURI(this.props.otherparam)
      console.log(otherParam, 'param')
      otherParam = encodeURI(otherParam.replace(/-/g, ' '))
      path = `${config.domain}/${this.props.endpoint}/${otherParam}`
      console.log(path, 'path')
    }else{
      path = `${config.domain}/${this.props.endpoint}`
    }
    console.log(path, 'path')
    fetch(path)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong..." });
        }
        return response.json()
      })
      .then(data => {console.log(data, 'data'); this.setState({ data: data, loaded: true })})
      .catch(err => console.log(err, 'err'))
  }

  render() {
    const { data, loaded, placeholder } = this.state;
    return loaded ? this.props.render(data) : <p>{placeholder}</p>;
  }
}

export default DataProvider;