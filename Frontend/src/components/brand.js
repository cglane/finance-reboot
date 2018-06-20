
import React, {Component} from 'react';

const styles =  {
    main: {
        width: '20%',
        'padding': '10px',
    },
    img: {
        width: '100%'
    }
 }

class Brand extends Component {
    goHome() {
        window.location.assign('/');

    }
    render() {
        return (
            <div onClick={this.goHome}className={this.props.className}style= {styles.main}>
                <img alt={this.props.brandImg}onLoad={this.props.onBrandReady}style={styles.img}src={this.props.brandImg}/>
            </div>
        )
    }
}

   
export default Brand;