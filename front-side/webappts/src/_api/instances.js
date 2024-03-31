import axios from 'axios';
export const backend = axios.create({ baseURL: 'http://158.178.205.187:8080/' });