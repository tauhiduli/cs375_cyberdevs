import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { itemDescription } from '../actions/productActions';
function ProductScreen (props){
    const initialState = 1
    const id=props.match.params.id;
    const [numberOfItems,setNumberOfItems] = useState(initialState);
    const itemsDesc = useSelector(state => state.productDetails)
    const product=itemsDesc['product']
    const notDone = itemsDesc['loading']
    const d = useDispatch()
    const u=useEffect
    u(()=>{
        
        d(itemDescription(id))
        return () => {
        }
    }, [])

    const putItems = () => {
        let x = props.history
        x.push("/cart/"+props.match.params.id+"?qty="+numberOfItems)
    }
    
    return (
        <div>
            <div id="return-home">
                <Link to="/">Back to homepage</Link>
            </div>
            
                <div id="desc">
                <div id="desc-img">
                    <img src={notDone ? "" : product.image} alt="product-details"/>
                </div>

                <div id="desc-inf">
                    <ul>
                        <li>
                            <h4>
                                {notDone ? "" : product.name}
                            </h4>
                        </li>
                        <li>
                            Price: <b>${notDone ? "" : product.price}</b>
                        </li>
                    </ul>
                </div>
                <div id="desc-perform">
                    <ul>
                        <li>
                            Price: ${notDone ? "" : product.price}
                        </li>
                        <li>
                            Status: {notDone ? "" : product.status}
                        </li>
                        <li>
                            Qty:
                            <select value={numberOfItems} onChange={(event) => {setNumberOfItems(event.target.value)}}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </li>
                        <li>
                            <button onClick={putItems} className="button primary"> Add to cart</button>
                        </li>
                    </ul>
                </div>
            </div>
            
            
        </div>
    )
}
export default ProductScreen;