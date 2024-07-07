import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
  });

  const getFetch = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    try{
      const res = await fetch(url);
      const data = await res.json();
      setState({
        data,
        isLoading: false,
        hasError: null,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        hasError: error,
      });
    }
  };

  useEffect(() => {
    getFetch();
  }, [url]);

  return {
    ...state,
  };
};