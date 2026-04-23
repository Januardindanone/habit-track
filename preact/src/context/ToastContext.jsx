import { createContext } from 'preact';
import { useState, useContext } from 'preact/hooks';
import ToastCard from '../components/Toast';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  function show(message, type = 'success') {
    setToast({ message, type });
  }

  const toastAPI = {
    success: (msg) => show(msg, 'success'),
    error: (msg) => show(msg, 'error'),
  };

  return (
    <ToastContext.Provider value={toastAPI}>
      {children}

      {toast && (
        <ToastCard
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
