import {publishNews, getNewsList, editNews, delNews} from '../services/news';

export default {

  namespace: 'news',

  state: {
    list: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      if (history.location.pathname === '/news') {
        dispatch({
          type: 'getNews',
        });
      }
    },
  },

  effects: {
    *getNews({ payload }, { call, put }) {
      const {status, data} = yield call(getNewsList);
      if (status === 0) {
        yield put({ type: 'getNewsList', payload: {list: data} });
      }
    },
    *handleDelNews({payload}, {call, put}) {
      const {status} = yield call(delNews, payload);
      if (status === 0) {
        yield put({type: 'getNews'});
      }
    },
    *handlePublishNews({payload}, {call, put}) {
      const {status} = yield call(publishNews, payload);
      if (status === 0) {
        yield put({type: 'getNews'});
      }
    },
    *handleEditNews({payload}, {call, put}) {
      const {status} = yield call(editNews, payload);
      console.log(status);
      if (status === 0) {
        yield put({type: 'getNews'});
      }
    },
  },

  reducers: {
    getNewsList(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
