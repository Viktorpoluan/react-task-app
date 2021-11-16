import React from 'react'
import classes from './Cart.module.css'
import classes1 from '../Category/Category.module.css'
import Counter from './countNav'

class Cart extends React.Component {
    state = {
        count: 1
    }

    compareProduct = (value, name, id) => {
         try {
            for (let i = 0; i < this.props.selectedNames.length; i++) {
                for (let a = 0; a < this.props.selectedNames[i].length; a++) {
                    if (((value + name) === (this.props.selectedNames[i][a].value + this.props.selectedNames[i][a].name))) {
                        id.className = classes.wrapper_chosen
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
        return value
    }

    compareProduct1 = (value, name, id) => {
        try {
            for (let i = 0; i < this.props.selectedNames.length; i++) {
                for (let a = 0; a < this.props.selectedNames[i].length; a++) {
                    if (((value + name) === (this.props.selectedNames[i][a].value + this.props.selectedNames[i][a].name))) {
                        id.className = classes.color_choosen
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }

    }
    state = {
        count: 0
    }
    handleClick = () => {
        this.setState(prev => ({ count: prev.count + 1 }))
    }
    render() {
        
        return (
            <div>
                <div className={classes.cart}>CART</div>
                <div className={classes.wrapper}>
                    {this.props.showCart.map(i => {
                        return (
                            <div>
                                <div className={classes.rect}/>
                                <div className={classes.wrapper_items}>
                                    <div className={classes.param} onClick={()=>console.log(i.id)}>
                                        <div className={classes.param_name} >{i.name}</div>
                                        <div
                                            className={classes.param_price}>{this.props.currentId} {i.prices.filter(i => i.currency === this.props.currentName).map(i => i.amount)}</div>
                                        {i.attributes.map((item, index) => {
                                            return <div key={index}>
                                                {/*<div className={classes1.item_name}>{item.name.toUpperCase()}:</div>*/}
                                                <div className={classes1.item_pos}>
                                                    {item.items.map(i => {

                                                        return <div>
                                                            {
                                                                item.name === 'Color'
                                                                    ? <div id={i.value + item.name} style={{
                                                                        border:'1px solid black',
                                                                        backgroundColor: i.value,
                                                                    }}
                                                                           className={classes.wrapper_values}>{
                                                                        this.compareProduct1(i.value, item.name, document.getElementById(i.value + item.name))
                                                                    }</div>
                                                                    : <div id={i.value + item.name}
                                                                           className={classes.wrapper_values}
                                                                           style={{minWidth:'63px', minHeight:'45px', marginTop:'10px', marginRight:'12px', opacity:'100%'}}

                                                                    >
                                                                        {
                                                                            this.compareProduct(i.value, item.name, document.getElementById(i.value + item.name))
                                                                        }
                                                                    </div>
                                                            }
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    <Counter/>
                                </div>

                                <div className={classes.pict}>
                                    <div className={classes.vector_left}></div>
                                    <img src={i.gallery[0]}/>
                                </div>
                                <div className={classes.vector_right}></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Cart