import "./Home.css";

import { LINKS, ROUTES } from "../../config";

import { Link } from "react-router-dom";
import React from "react";

export const Home = () => {
  return (
    <div className="home-root-container">
      <h1>Home</h1>
      <br />
      <Link to={ROUTES.DASHBOARD}>Go to Dashboard</Link>
      <br />
      <br />
      <Link to={ROUTES.GITHUB}>Visit My Github</Link>
    </div>
  );
};
