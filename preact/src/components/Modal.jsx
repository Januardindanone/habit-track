export default function Modal({ children, onClose }) {
  return (
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="relative">
        {children}

        <button onClick={onClose} class="absolute top-2 right-2 text-gray-500">
          ✕
        </button>
      </div>
    </div>
  );
}
