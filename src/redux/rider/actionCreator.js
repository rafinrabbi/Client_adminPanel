import {rideOrder} from './actions'
const actionCreator = ()=> dispatch => {
    fetch ('https://dsp-project-773e5-default-rtdb.firebaseio.com/RiderOrderDetails.json')
    .then(res=>res.json())
    .then(data=>dispatch(rideOrder(data)))
}
export default actionCreator