import {showAllSeller} from './actions'
const actionCreator = ()=> dispatch => {
    fetch ('https://dsp-project-773e5-default-rtdb.firebaseio.com/.json')
    .then(res=>res.json())
    .then(data=>dispatch(showAllSeller(data.Users)))
}
export default actionCreator