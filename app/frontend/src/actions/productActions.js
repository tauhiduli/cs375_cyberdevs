
var axios=require('axios')
const { ITEMS_REQUEST, 
  ITEMS_SUCCESS, 
  ITEMS_FAIL , 
  ITEMS_DESC_REQUEST,
  ITEMS_DESC_SUCCESS,
  ITEMS_DESC_FAIL} = require("../constants/productConstants")

const productItems = () => async (dispatch) => {
    try {
      dispatch({ type: ITEMS_REQUEST });
      const { data } = await axios.get("/api/products");
      dispatch({ type: ITEMS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ITEMS_FAIL, payload: error.message });
    }
  };

const itemDescription = (productId) => async (dispatch) => {
  try{
    dispatch({type: ITEMS_DESC_REQUEST , payload: productId})
    const {data} = await axios.get("/api/products/" + productId)
    dispatch({type:ITEMS_DESC_SUCCESS,payload:data})
  }catch (error){
    dispatch({type:ITEMS_DESC_FAIL,payload: error.message})
  }
}
export { productItems,itemDescription }