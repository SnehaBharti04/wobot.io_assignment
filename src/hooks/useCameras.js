import { useEffect, useState } from "react";

import { fetchCameras } from "../api/cameraApi";

export default function useCameras() {
  const [camera, setCamera] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
  
    async function load() {
      try {
        const res = await fetchCameras();
        if (mounted) {
          setCamera(res.data.data.cameras);
        }
      } catch (error) {
        if (mounted) setError(error.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
  
    load();
    return () => (mounted = false);
  }, []);
  

  return { camera, setCamera, error, loading };
}
