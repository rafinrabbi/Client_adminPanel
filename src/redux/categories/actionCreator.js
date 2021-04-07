import {showAllCategory} from './actions'
const actionCreator = ()=> dispatch => {
    fetch ('https://dsp-project-773e5-default-rtdb.firebaseio.com/Category.json')
    .then(res=>res.json())
    .then(data=>dispatch(showAllCategory(data)))
}
export default actionCreator