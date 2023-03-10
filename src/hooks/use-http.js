import axios from "axios";
import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const sendRequest = useCallback(async (request, handleResponse) => {
    try {
      setIsLoading(true);
      if (request.method === "GET") {
        const response = await axios
          .get(request.endpoint)
          .catch((err) => console.log(err));

        setIsLoading(false);
        handleResponse(response);
      } else if (request.method === "POST") {
        const response = await axios
          .put(request.endpoint, request.body)
          .catch((err) => console.log(err));

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setHasError(error);
    }
  }, []);
  return {
    isLoading,
    hasError,
    sendRequest,
  };
};
export default useHttp;
