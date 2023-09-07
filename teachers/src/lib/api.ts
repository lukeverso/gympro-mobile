import axios from 'axios';

export const api = axios.create({
     // baseURL: 'http://192.168.0.93:3333',
     baseURL: 'https://gympro-server.vercel.app',
});