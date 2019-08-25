import _ from 'lodash'
import jsonPlaceholder from '../apis/jsonPlaceHolder'

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts())
    const userIds = _.uniq(_.map(getState().posts, 'userId'))
    userIds.map(userId => {
        dispatch(fetchUser(userId))
    })
}
export const fetchPosts = () => async (dispatch) => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({
        type: 'FETCH_POSTS',
        payload: response.data
    })
}

export const fetchUser = (user_id) => async (dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${user_id}`);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    })
}
