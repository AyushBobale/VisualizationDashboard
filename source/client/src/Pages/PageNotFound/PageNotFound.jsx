import "./PageNotFound.css";

import { Link } from "react-router-dom";
import React from "react";

function PageNotFound() {
  return (
    <div className="page-not-found">
      PageNotFound <Link to={"/"}>Go Home</Link>
    </div>
  );
}

export default PageNotFound;
