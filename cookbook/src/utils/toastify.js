import { toast } from "react-toastify";

function toastMessage(type, message) {
  if (type === "error") {
    return toast.error(message, { className: "toast-error" });
  } else if (type === "success") {
    return toast.error(message, { className: "toast-success" });
  }
}

function toastLoading(message) {
  return toast(message, {
    type: toast.TYPE.INFO,
    className: "toast-loading",
    autoClose: false
  });
}

function toastUpdate(id, message) {
  return toast.update(id, { render: message, autoClose: 3000 });
}

export { toastLoading, toastUpdate, toastMessage };
