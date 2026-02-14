import react from "react";
import { useState } from "react";
import { updateStatus } from "../api/cameraApi";
import "../assets/style.css";
import toast from "react-hot-toast";
import Message from "../constant/Message";
import Constant from "../constant/Constant";

export function CameraTable({ camera, setCamera }) {
  const [loadingId, setLoadingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const deleteRow = (id) => {
    setCamera((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleStatus = async (cam) => {
    setLoadingId(cam.id);
    const isActive = cam.status.toLowerCase() === Constant.active;
    const newStatus = isActive ? Constant.Inactive: Constant.Active;

    try {
      await updateStatus(cam.id, newStatus);
      setCamera((prev) =>
        prev.map((c) => (c.id === cam.id ? { ...c, status: newStatus } : c))
      );

      toast.success(`${cam.name} set to ${newStatus}`);
    } catch {
      toast.error(Message.UPDATE_FAILED);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <table className="cam-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Resolution</th>
          <th>Model</th>
          <th>Last Updated</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {camera.map((cam) => (
          <tr key={cam.id}>
            <td className="name">{cam.name}</td>
            <td>{cam.location}</td>
            <td>{cam.resolution}</td>
            <td>{cam.model}</td>
            <td>{new Date(cam.last_updated).toLocaleString()}</td>

            <td>
              <span
                className={`badge ${cam.status.toLowerCase()}`}
                onClick={() => !loadingId && toggleStatus(cam)}
              >
                {loadingId === cam.id
                  ? "..."
                  : cam.status.charAt(0).toUpperCase() +
                    cam.status.slice(1).toLowerCase()}
              </span>
            </td>

            <td>
              <button className="delete" onClick={() => setDeleteId(cam.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Camera?</h3>
            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button className="cancel" onClick={() => setDeleteId(null)}>
                Cancel
              </button>

              <button
                className="confirm"
                onClick={() => {
                  deleteRow(deleteId);
                  const camName = camera.find((c) => c.id === deleteId)?.name;
                  toast.success(`${camName} deleted`);
                  setDeleteId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </table>
  );
}
