import React from 'react';
import classes from './Product.module.css'
import OverlayCart from "../OverlayCart/OverlayCart";
class Product extends React.Component {
    render() {
        return (
            <div className={classes.wrapper}>
                <div className={classes.gridProd}>
                    {this.props.active
                        ? this.props.filterProduct
                        : this.props.showAllCategories
                    }
                </div>
            </div>

        )
    }
}
export default Product