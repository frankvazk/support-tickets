import axios from "axios";
const API_URL = "/api/tickets";

const create = async (ticket, token) => {
  const response = await axios.post(API_URL, ticket, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get user tickets
const getTickets = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const ticketService = {
  create,
  getTickets,
};

export default ticketService;
