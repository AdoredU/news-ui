import req from '../utils/request';

/*发布新闻*/
export const publishNews = params => req.post('/news/publishNews', params);

/*获取新闻列表*/
export const getNewsList = () => req.get('/news/getNews');

/*删除新闻*/
export const delNews = params => req.get('/news/deleteNews', params);

/*更新新闻*/
export const editNews = params => req.get('/news/updateNews', params);
