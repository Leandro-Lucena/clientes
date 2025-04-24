import { Client } from "@/types";
import api from "../utils/axios";

export const getClients = async (): Promise<Client[]> => {
  const response = await api.get<Client[]>("/client");
  return response.data;
};

export const deleteClient = async (
  clientId: number
): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/client/${clientId}`);
  return response.data;
};

export const createClient = async (
  newClient: Omit<Client, "id">
): Promise<Client> => {
  const response = await api.post<Client>("/client", newClient);
  return response.data;
};

export const updateClient = async (
  clientId: number,
  updatedClient: Partial<Client>
): Promise<Client> => {
  const response = await api.put<Client>(`/client/${clientId}`, updatedClient);
  return response.data;
};
