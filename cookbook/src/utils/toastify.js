import { toast } from "react-toastify";

function createToast(type, message) {
  if (type === "error") {
    return toast.error(message, { className: "toast-error" });
  } else if (type === "success") {
    return toast.error(message, { className: "toast-success" });
  }
}

export { createToast };
