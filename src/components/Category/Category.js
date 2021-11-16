import React from 'react'
import classes from './Category.module.css'
import Product from "../under_components/Product";
import OverlayCart from "../OverlayCart/OverlayCart";

class Category extends React.Component {
    render() {
        return (
            <>
                <div className={classes.wrapper}>
                    <div className={classes.cat_name} onClick={(e) => this.props.changeCategory(e)}>
                        {this.props.state.active
                            ? null
                            : this.props.showData
                        }
                    </div>
                    <div onClick={(e) => this.props.onclick(e)}>
                        <Product
                            isActiveOverCart={this.props.isActiveOverCart}
                            showCart={this.props.showCart}
                            counterCart={this.props.counterCart}
                            isActives={this.props.isActives}
                            active={this.props.active}
                            showAllCategories={this.props.showAllCategories}
                            filterProduct={this.props.filterProduct}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default Category