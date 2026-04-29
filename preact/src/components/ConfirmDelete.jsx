export default function ConfirmDelete({
  open,
  title = "Hapus Data",
  message = "Yakin ingin menghapus data ini?",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-sm p-5">
        <h2 class="text-lg font-semibold mb-2">{title}</h2>

        <p class="text-sm text-gray-600 mb-4">{message}</p>

        <div class="flex justify-end gap-2">
          <button
            onClick={onCancel}
            class="px-4 py-2 text-sm bg-gray-200 rounded"
            disabled={loading}
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            class="px-4 py-2 text-sm bg-red-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
