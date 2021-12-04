import React from 'react'
import classes from './Cart.module.css'

class Data extends React.Component {
    
    render() {
         return (
            <>
                {this.props.event.attributes.map((item, index) => {
                    return <div key={index}>
                        <div className={classes.item_pos}>
                            {item.items.map(i => {
                                return <div>
                                    {
                                        item.name === 'Color'
                                            ? <div id={index} style={{
                                                border: '1px solid black',
                                                backgroundColor: i.value,
                                            }}
                                                  className={this.props.chosenStyle(i.value,item.name) ? classes.color_choosen : classes.wrapper_values}
                                            >
                                            </div>
                                            : <div id={i.value+item.name}
                                                   className={this.props.chosenStyle(i.value, item.name)?classes.wrapper_chosen:classes.wrapper_values}
                                                   style={{
                                                       minWidth: '63px',
                                                       minHeight: '45px',
                                                       marginTop: '10px',
                                                       marginRight: '12px',
                                                       opacity: '100%'
                                                   }}
                                            >
                                                {
                                                    i.value
                                                }
                                            </div>
                                    }
                                </div>
                            })}
                        </div>
                    </div>
                })}
            </>
        )
    }
}

export default Data