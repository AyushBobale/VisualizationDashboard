import { Link } from "react-router-dom";
import React from "react";

function PageNotFound() {
  return (
    <div>
      PageNotFound
      <Link to={"/"}>Go Home</Link>
    </div>
  );
}

export default PageNotFound;
