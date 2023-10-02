import axios from 'axios';

export const api = axios.create(
     {
          baseURL: 'https://gympro-server.vercel.app',
     }
);