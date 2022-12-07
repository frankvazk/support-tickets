import axios from "axios";
const API_URL = "/api/tickets";

const createNote = async (ticketId, text, token) => {
  const response = await axios.post(
    `${API_URL}/${ticketId}/notes`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const getNotes = async (ticketId, token) => {
  const response = await axios.get(`${API_URL}/${ticketId}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const noteService = {
  createNote,
  getNotes,
};

export default noteService;
