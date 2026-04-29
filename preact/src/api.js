const API_BASE = "http://localhost:8000/api";

export const deleteHabit = async (id_habit) => {
  const res = await fetch(`${API_BASE}/habit/${id_habit}`, {
    method: "DELETE",
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
  const res = await fetch(`${API_BASE}/habit/${id}`, {
    method: "PUT", // atau PATCH kalau backend kamu pakai itu
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
  const res = await fetch(`${API_BASE}/riwayat/${id_habit}`, {
    method: "DELETE",
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

// export const login = async (username, password) => {
//   const res = await fetch(`${API_BASE}/login`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password })
//   });
//   const result = await res.json();
//   if (res.ok && result.success === true) return result;
//   throw new Error(result.message || 'Login Gagal');
// };

// export const getIdUser = async () => {
//   const res = await fetch(`${API_BASE}/me`, {
//     credentials: 'include',
//   });
//   const result = await res.json();
//   return result.id_user;
// };

// export const checkSession = async () => {
//   const res = await fetch(`${API_BASE}/me`, {
//     credentials: 'include',
//   });
//   const result = await res.json();
//   return result.logged_in === true;
// };

// export const addPembayaranUtang = async (data) => {
//   const res = await fetch(`${API_BASE}/bayar-utang`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//     credentials: 'include',
//   });
//   const result = await res.json();
//   if (res.ok && result.success === true) return result;
//   throw new Error(result.message || 'Gagal menambahkan penjualan');
// };

// export const getUtang = async () => {
//   const res = await fetch(`${API_BASE}/utang`, {credentials: 'include',});
//   const result = await res.json();
//   if (res.ok && result.success === true) return result.data || [];
//   throw new Error(result.message || 'Gagal memuat data utang');
// };

// export const getRingkasan = async (filter = 'keseluruhan') => {
//   const res = await fetch(`${API_BASE}/ringkasan?filter=${encodeURIComponent(filter)}`, {credentials: 'include',});
//   const result = await res.json();
//   if (res.ok && result.success === true) return result.data || [];
//   throw new Error(result.message || 'Gagal memuat data ringkasan');
// };

// export const getPembeli = async () => {
//   const res = await fetch(`${API_BASE}/pembeli`, {credentials: 'include',});
//   const result = await res.json();
//   if (res.ok && result.success === true) return result.data || [];
//   throw new Error(result.message || 'Gagal memuat data pembeli');
// };

// export const addPenjualan = async (data) => {
//   const res = await fetch(`${API_BASE}/penjualan`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//     credentials: 'include',
//   });
//   const result = await res.json();
//   if (res.ok && result.success === true) return result;
//   throw new Error(result.message || 'Gagal menambahkan penjualan');
// };

// export const getHargaSpesial = async (id_barang) => {
//   const res = await fetch(`${API_BASE}/harga-spesial/${id_barang}`, {credentials: 'include',});
//   const result = await res.json();
//   if (res.ok && result.success === true) return result.data || [];
//   throw new Error(result.message || 'Gagal memuat data');
// };

// export const addHargaSpesial = async (id_barang,  data) => {
//   const res = await fetch(`${API_BASE}/harga-spesial/${id_barang}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//     credentials: 'include',
//   });
//   const result = await res.json();
//   if (res.ok && result.success === true) return result;
//   throw new Error(result.message || 'Gagal menambahkan Harga Spesial');
// };

// export const deleteHargaSpesial = async (id) => {
//   const res = await fetch(`${API_BASE}/harga-spesial/${id}`, {
//     method: 'DELETE',
//     credentials: 'include',
//   });
//   const result = await res.json();
//   if (res.ok && result.success === true) return result;
//   throw new Error(result.message || 'Gagal menghapus harga spesial');
// };

// export const getBarang = async () => {
//   // const res = await fetch(`${API_BASE}/barang`);
//   const res = await fetch(`${API_BASE}/barang`, {
//     credentials: 'include',
//   });
//   const result = await res.json();
//   if (res.ok && result.success === true) return result.data || [];
//   throw new Error(result.message || 'Gagal memuat data');
// };

// export const addBarang = async (data) => {
//   const res = await fetch(`${API_BASE}/barang`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//     credentials: 'include',
//   });
//   const result = await res.json();
//   if (res.ok && result.success === true) return result;
//   throw new Error(result.message || 'Gagal menambahkan barang');
// };

// export const updateBarang = async (id, data) => {
//   const res = await fetch(`${API_BASE}/barang/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//     credentials: 'include',
//   });

//   const result = await res.json();
//   if (res.ok && result.success === true) return result;
//   throw new Error(result.message || 'Gagal mengupdate barang');
// };

// export const deleteBarang = async (id) => {
//   const res = await fetch(`${API_BASE}/barang/${id}`, {
//     method: 'DELETE',
//     credentials: 'include',
//   });
//   const result = await res.json();
//   if (res.ok && result.success === true) return result;
//   throw new Error(result.message || 'Gagal menghapus barang');
// };

// // export const importCSV = async (formData) => {
// //   const res = await fetch(`${API_BASE}/barang/import`, {
// //     method: 'POST',
// //     body: formData, // penting! tanpa Content-Type agar browser set multipart otomatis
// //   });

// //   const result = await res.json();
// //   if (res.ok && result.success === true) return result;
// //   throw new Error(result.message || 'Gagal mengimpor CSV');
// // };
