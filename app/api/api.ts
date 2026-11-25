import axios from 'axios';

// запити з серверної частини Next.js напряму на бекенд
export const api = axios.create({
  baseURL: process.env.BACKEND_URL ?? 'https://lehlehka.b.goit.study',
  withCredentials: true,
});
