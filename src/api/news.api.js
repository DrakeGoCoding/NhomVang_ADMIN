import agent from "./agent";
import { ADMIN_NEWS_ENDPOINT, NEWS_ENDPOINT } from "../constants/endpoints";

const pageSize = 10;

const limit = (size, page) => `limit=${size}&offset=${page ? page * size : 0}`;
const omitForNews = news =>
    Object.assign({}, news, {
        author: undefined,
        slug: undefined,
        createdDate: undefined,
        modifiedDate: Date.now()
    });

const News = {
    getAll: (page = 0) => agent.get(`${NEWS_ENDPOINT}?${limit(pageSize, page)}`),
    getBySlug: slug => agent.get(`${NEWS_ENDPOINT}/${slug}`),
    create: news => agent.post(ADMIN_NEWS_ENDPOINT, { news }),
    update: news => agent.put(`${ADMIN_NEWS_ENDPOINT}/${news.slug}`, { news: omitForNews(news) }),
    delete: slug => agent.delete(`${ADMIN_NEWS_ENDPOINT}/${slug}`),
    pageSize
};

export default News;
