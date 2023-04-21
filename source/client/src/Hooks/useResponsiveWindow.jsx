import React, { useEffect, useState } from "react";

export const useResponsiveWindow = () => {
  const getWindowSize = () => {
    if (window.innerWidth <= 1200) {
      return { phone: true };
    } else {
      return { phone: false };
    }
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    setWindowSize(getWindowSize());
  }, []);

  return windowSize;
};
