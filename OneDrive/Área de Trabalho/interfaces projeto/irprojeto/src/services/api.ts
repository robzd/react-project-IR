import axios from 'axios';
import { Jogador } from '../models/jogador';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export const inserir = (data: Omit<Jogador, 'id'>) => api.post<Jogador>('/modelos', data);
export const atualizar = (id: string, data: Omit<Jogador, 'id'>) =>
  api.put<Jogador>(`/modelos/${id}`, data);
export const detalhar = (id: string) => api.get<Jogador>(`/modelos/${id}`);
export const remover = (id: string) => api.delete<void>(`/modelos/${id}`);
export const listar = () => api.get<Jogador[]>('/modelos');
export const perfil = (id: string) => api.get<Jogador>(`/modelos/${id}`);

// Alterar services