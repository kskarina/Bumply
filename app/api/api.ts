import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.BACKEND_URL ?? 'https://lehlehka.b.goit.study',
  withCredentials: true,
});
