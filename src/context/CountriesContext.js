// CountriesContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { getCountries } from "../api/apiMethods";

// Create context
const CountriesContext = createContext();

// Create provider component
export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const countriesDataFetched = useRef(false);

  const getAllCountriesData = () => {
    setLoading(true);
    getCountries()
      .then((response) => {
        if (response?.status === true) {
          setCountries(response?.data);
          // Optional: Cache in localStorage
          localStorage.setItem("countries", JSON.stringify(response.data));
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "API request failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (countriesDataFetched.current) return;

    // Try to get from localStorage first
    const cachedData = localStorage.getItem("countries");
    if (cachedData) {
      setCountries(JSON.parse(cachedData));
      setLoading(false);
      countriesDataFetched.current = true;
      return;
    }

    // If no cached data, fetch from API
    countriesDataFetched.current = true;
    getAllCountriesData();
  }, []);

  // Provide method to refresh data if needed
  const refreshCountries = () => {
    getAllCountriesData();
  };

  const contextValue = {
    countries,
    loading,
    error,
    refreshCountries,
  };

  return (
    <CountriesContext.Provider value={contextValue}>
      {children}
    </CountriesContext.Provider>
  );
};

// Custom hook to use the countries data
export const useCountries = () => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error("useCountries must be used within a CountriesProvider");
  }
  return context;
};
