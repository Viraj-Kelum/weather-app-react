import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export const Notification = () => {
  return (
    <div>
        <ToastContainer position="top-right" theme="dark" />
    </div>
  );
};