const initialState = {
  data: [],
  loading: false,
  err: null
}

const FETCH_NEWS_BEGIN = 'APP/FETCH_NEWS_BEGIN'
const FETCH_NEWS_SUCCESS = 'APP/FETCH_NEWS_SUCCESS'
const FETCH_NEWS_FAILED = 'APP/FETCH_NEWS_FAILED'

export function fetchNews () {
  return dispatch => {
    dispatch({
      type: FETCH_NEWS_BEGIN
    })
    return Promise.resolve({
      data: [
        'Hi, this is news from server',
        'The second news',
        'The third'
      ]
    }).then(res => {
      dispatch({
        type: FETCH_NEWS_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: FETCH_NEWS_FAILED,
        payload: err
      })
    })
  }
}

export default function newsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS_BEGIN: {
      return {
        ...state,
        err: null,
        loading: true
      }
    }
    case FETCH_NEWS_SUCCESS: {
      return {
        ...state,
        err: null,
        loading: false,
        data: action.payload
      }
    }
    case FETCH_NEWS_FAILED: {
      return {
        ...state,
        loading: false,
        err: action.payload,
        data: []
      }
    }
    default: {
      return state
    }
  }
}
