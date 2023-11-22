import axios from "axios";
import { BASE_URL } from "./baseUrl";

const token = localStorage.getItem("loginToken");

const config = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};

// Get all lists
export const getLists = async () => {
  const res = await axios.get(`${BASE_URL}/lists`, config);
  return res;
};

// Create list
export const postList = async (listTitle: string) => {
  const bodyParams = {
    name: listTitle,
  };
  const res = await axios.post(`${BASE_URL}/lists`, bodyParams, config);
  return res;
};

// Update list
export const putList = async (listTitle: string, listUuid: string) => {
  const bodyParams = {
    name: listTitle,
  }
  const res = await axios.put(`${BASE_URL}/lists/${listUuid}`, bodyParams, config);
  return res;
}

// Delete list
export const deleteList = async (listUuid: string) => {
  const res = await axios.delete(`${BASE_URL}/lists/${listUuid}`, config);
  return res;
};

// Get tasks belong to list
export const getTasks = async (listUuid: string) => {
  const res = await axios.get(`${BASE_URL}/lists/${listUuid}/tasks`, config);
  return res;
};

// Create task
export const postTask = async (taskName: string, listUuid: string) => {
  const bodyParams = {
    text: taskName,
    listUuid: listUuid,
  };
  const res = await axios.post(`${BASE_URL}/tasks`, bodyParams, config);
  return res;
};

// Update task
export const putTask = async (
  taskUuid: any,
  text: any,
  completed: any,
  listUuid: string
) => {
  const bodyParams = {
    text: text,
    completed: completed,
    listUuid: listUuid,
  };
  const res = await axios.put(
    `${BASE_URL}/tasks/${taskUuid}`,
    bodyParams,
    config
  );
  return res;
};

// Delete task
export const deleteTask = async (taskUuid: any) => {
  const res = await axios.delete(`${BASE_URL}/tasks/${taskUuid}`, config)
  return res;
}