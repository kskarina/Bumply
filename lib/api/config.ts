export const API_URL = process.env.API_URL ?? 'https://lehlehka.b.goit.study';

// бекенд ставить cookie на свій домен, а нам потрібно, щоб вони жили на домені фронтенду
export const fixSetCookie = (cookie: string) =>
  cookie.replace(/;\s*domain=[^;]*/gi, '');
