const API_BASE = "http://localhost:8000/api";

export const deleteHabit = async (id_habit) => {
  const res = await fetch(`${API_BASE}/habit-delete/${id_habit}`, {
    method: "POST",
  });

  const result = await res.json();

  if (!res.ok || result.status !== "success") {
    throw new Error(result.message || "Gagal hapus Habit");
  }

  return result;
};

export const getStats = async () => {
  const res = await fetch(`${API_BASE}/stats`, {
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok || result.status !== "success") {
    throw new Error(result.message || "Gagal memuat statistik");
  }

  return result.data;
};
export const updateHabit = async (id, data) => {
  const res = await fetch(`${API_BASE}/habit-update/${id}`, {
    method: "POST", // atau PATCH kalau backend kamu pakai itu
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok || result.status !== "success") {
    throw new Error(result.message || "Gagal update habit");
  }

  return result;
};

export const getAllHabits = async () => {
  const res = await fetch(`${API_BASE}/habit`, {
    credentials: "include",
  });
  const result = await res.json();
  if (res.ok && result.status === "success") {
    return result.data;
  }
  throw new Error(result.message || "Gagal memuat habit");
};

export const addRiwayat = async (id_habit) => {
  const res = await fetch(`${API_BASE}/riwayat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_habit }),
  });

  const result = await res.json();

  if (!res.ok || result.status !== "success") {
    throw new Error(result.message || "Gagal tambah riwayat");
  }

  return result; // optional tapi bagus
};

export const deleteRiwayat = async (id_habit) => {
  const res = await fetch(`${API_BASE}/delete-riwayat/${id_habit}`, {
    method: "POST",
  });

  const result = await res.json();

  if (!res.ok || result.status !== "success") {
    throw new Error(result.message || "Gagal hapus riwayat");
  }

  return result;
};

export const getHabits = async (id_hari) => {
  const res = await fetch(`${API_BASE}/habit/${id_hari}`, {
    credentials: "include",
  });
  const result = await res.json();
  if (res.ok && result.status === "success") {
    return {
      hari: result.hari,
      habits: result.data,
    };
  }
  throw new Error(result.message || "Gagal memuat habit");
};

export const addHabit = async (data) => {
  const res = await fetch(`${API_BASE}/habit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const result = await res.json();
  if (res.ok && result.status === "success") return result;
  throw new Error(result.message || "Gagal menambahkan habit");
};
