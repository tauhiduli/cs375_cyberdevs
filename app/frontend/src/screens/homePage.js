import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { productItems } from '../actions/productActions';

function HomePage (props){
    /*
    <div className="my-item-name">
                            <Link to={'/product/' + item._id}>{item.name}</Link>
                        </div>
                        <div className="my-item-price">${item.price}</div>
                        */
    const itemList=useSelector(state=>state.productList)
    const items = itemList['products']
    const loading=itemList['loading']
    const error=itemList['error']
    
    const d = useDispatch();
    const u=useEffect;
    
    u(()=>{
        d(productItems())
        return ()=>{
        }
    },[])
    return (
        loading ? <div>Loading...</div> : error ? <div> {error} </div> : 
        <ul className="my-items">
            {
                items.map(item => 
                <li key={item._id}>
                    <div className="my-item">
                        <Link to={'/product/' + item._id}>
                            <img className="my-item-image" src={item.image} alt="product"/>
                        </Link>
                    </div>
                </li>
                )
            }
        </ul>
    )
}
export default HomePage;