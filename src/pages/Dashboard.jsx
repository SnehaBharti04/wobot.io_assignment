import { useState } from "react";
import { CameraTable } from "../components/CameraTable";
import useCameras from "../hooks/useCameras";
import Pagination from "../components/Pagination";

function Dashboard() {
  const { camera, setCamera, error, loading } = useCameras();

  const [filters, setFilters] = useState({
    name: "",
    location: "",
    resolution: "",
    model: "",
    status: "",
  });

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error}</p>;

  const handleFilter = (key, value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filtered = camera.filter((cam) => {
    const text = filters.name.toLowerCase();

    const matchesSearch =
      cam.name.toLowerCase().includes(text) ||
      cam.location.toLowerCase().includes(text) ||
      cam.resolution.toLowerCase().includes(text) ||
      cam.model.toLowerCase().includes(text) ||
      cam.status.toLowerCase().includes(text);

    return (
      matchesSearch &&
      cam.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      cam.resolution.toLowerCase().includes(filters.resolution.toLowerCase()) &&
      cam.model.toLowerCase().includes(filters.model.toLowerCase()) &&
      (filters.status === "" || cam.status === filters.status)
    );
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return (
    <div className="page">
      <div className="logo-bar">
        <img src="wobotLogo.svg" alt="wobot" className="logo" />
      </div>
      <div className="title-row">
        <div>
          <h2>Cameras</h2>
          <p className="subtitle">Manage your cameras here.</p>
        </div>

        <input
          className="search"
          placeholder="Search"
          onChange={(e) => handleFilter("name", e.target.value)}
        />
      </div>
      {/* Filter for location */}
      <div className="filterBar">
        <div className="filterBox">
          <img src="locationIcon.svg" />
          <select onChange={(e) => handleFilter("location", e.target.value)}>
            <option value="">Location</option>
            {[...new Set(camera.map((c) => c.location))].map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="filterBox">
          <img src="statusIcon.svg" />
          <select onChange={(e) => handleFilter("status", e.target.value)}>
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="tableCard">
        <CameraTable camera={paginated} setCamera={setCamera} />

        <Pagination
          page={page}
          totalPages={totalPages}
          perPage={perPage}
          setPage={setPage}
          setPerPage={setPerPage}
          start={start}
          filteredLength={filtered.length}
        />
      </div>
    </div>
  );
}

export default Dashboard;
