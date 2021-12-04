import React from 'react'
import classes from './Cart.module.css'
import classes1 from '../Category/Category.module.css'
import Counter from './Counter'
import ArrowsComponent from './ArrowsComponent'

class Cart extends React.Component {
    state = {
        num: 1
    }
    chosenStyle = (value) => {
        for (let i = 0; i < this.props.selectedNames.length; i++) {
            let isActives = false
            for (let a = 0; a < this.props.selectedNames[i].length; a++) {
                if (value === this.props.selectedNames[i][a].value) {
                    isActives = true
                }
                return isActives
            }
        }
    }

    updateData = (value) => {
        this.setState({num: value})
    }

    render() {
        return (
            this.props.emptyCart
                ? <>
                    <div className={classes.cart}>CART</div>
                    <div style={{marginLeft: '100px'}}>CART IS EMPTY</div>
                </>

                : <div>
                    <div className={classes.cart}>CART</div>
                    <div className={classes.wrapper}>
                        {this.props.showCart.map(event => {
                            return (
                                <>
                                    <div className={classes.rect}/>
                                    <div className={classes.wrapper_items}>

                                        <div className={classes.param}>
                                            <div className={classes.param_name}>{event.name}</div>
                                            <Counter updateData={this.updateData}
                                                     event={event}
                                                     currentId={this.props.currentId}
                                                     currentName={this.props.currentName}
                                                     selectedNames={this.props.selectedNames}
                                                     showCart={this.props.showCart}
                                                     chosenStyle={this.chosenStyle}
                                                     count={this.props.count}
                                                     decrement={this.props.decrement}
                                                     increment={this.props.increment}
                                            />
                                        </div>
                                        <ArrowsComponent gallery={event.gallery}/>
                                    </div>

                                </>
                            )
                        })}
                    </div>
                    <button style={{marginLeft: '100px', marginBottom: '50px'}} onClick={() => this.props.clearCart()}>CLEAR
                        CART
                    </button>
                </div>
        )
    }
}

export default Cart