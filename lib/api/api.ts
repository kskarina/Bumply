import axios from 'axios';

// Запити з браузера йдуть на наші route handlers (app/api),
// а ті вже звертаються до бекенду. Так cookie з токенами живуть на нашому домені.
const baseURL = (process.env.NEXT_PUBLIC_API_URL ?? '') + '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
