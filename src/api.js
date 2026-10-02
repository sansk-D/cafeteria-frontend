import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://cafeteria-backend-pbzm.onrender.com' 
  // ¡Pon aquí el enlace exacto de tu backend en Render sin barra al final!
});