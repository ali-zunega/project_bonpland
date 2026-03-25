const API_URL = "http://localhost:3000/api/v1/"; // ajustalo

export const getProperties = async () => {
  const res = await fetch(`${API_URL}/properties`);
  return res.json();
};

export const getPropertyById = async (id) => {
  const res = await fetch(`${API_URL}/properties/${id}`);
  return res.json();
};

export const createProperty = async (data) => {
  const res = await fetch(`${API_URL}/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateProperty = async (id, data) => {
  const res = await fetch(`${API_URL}/properties/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteProperty = async (id) => {
  await fetch(`${API_URL}/properties/${id}`, {
    method: "DELETE",
  });
};