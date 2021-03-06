import React from 'react'
import classes from './OverlayCart.module.css'
import Cart from '../Cart/Cart'
class OverlayCart extends React.Component {
    compareProduct = (value, name, id) => {
        try {
            for (let i = 0; i < this.props.selectedNames.length; i++) {
                for (let a = 0; a < this.props.selectedNames[i].length; a++) {
                    if(((value+name)===(this.props.selectedNames[i][a].value+this.props.selectedNames[i][a].name))){
                       id.className=classes.item_value_chosen
                    }
                }
            }
        }
        catch (e) {
            console.log(e)
        }
        return value
    }
    render() {
        return (
            <>
                <div className={classes.rect}>
                    <div className={classes.minicart}
                          onMouseEnter={this.props.activator}
                          onMouseLeave={this.props.deactivator}
                    >
                        <div className={classes.minicart_text}>My bag, {this.props.counterCart} {this.props.counterCart===1?'item':'items'} </div>
                        {this.props.emptyCart
                            ?null
                            :this.props.showCart.map(i => {
                                    return (
                                        <div className={classes.position}>
                                            <div className={classes.wrapper_items}>
                                                <div className={classes.param}>
                                                    <div className={classes.param_name}>{i.name}</div>
                                                    <div className={classes.param_price}>{this.props.currentId}{i.prices.filter(i=>i.currency===this.props.currentName).map(i=>i.amount)}</div>
                                                    {i.attributes.map((item, index) => {
                                                        return <div key={index}>
                                                            <div className={classes.item_pos}>
                                                                {item.items.map(i => {
                                                                        return <div className={classes.wrapper_value}>
                                                                            {
                                                                                item.name === 'Color'
                                                                                    ? <div style={{
                                                                                        backgroundColor: i.value,
                                                                                        minHeight: '24px',
                                                                                        minWidth: '24px'
                                                                                    }}
                                                                                           className={this.props.chosenStyle(i.value, item.name)?classes.color_choosen:classes.colors}
                                                                                    >{' '}</div>
                                                                                    :
                                                                                    <div
                                                                                        id={i.value+item.name}
                                                                                        className={this.props.chosenStyle(i.value, item.name)?classes.item_value_chosen:classes.item_value}
                                                                                        style={
                                                                                            {
                                                                                                maxHeight:'24px',
                                                                                                maxWidth:'45px'
                                                                                            }
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            i.value
                                                                                        }
                                                                                    </div>
                                                                            }
                                                                        </div>
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>
                                                <div className={classes.wraps}>
                                                    <div className={classes.plus}>
                                                        <div>+</div>
                                                    </div>
                                                    <div className={classes.count_img}>1</div>
                                                    <div className={classes.minus}>
                                                        <div>-</div>
                                                    </div>
                                                </div>

                                                {/*<div className={classes.vector_left}></div>*/}
                                                {/*<div className={classes.vector_right}></div>*/}
                                            </div>
                                            <div className={classes.pict}>
                                                <img src={i.gallery[0]}/>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default OverlayCart