import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
const File = ({ file }) => {
  return (
    <a href={file.url} target="_blank" className="btn btn-outline-dark text-truncate w-100">
      <FontAwesomeIcon icon={faFile} className="mr-2" />
      &nbsp; {file.name}
    </a>
  );
};

export default File;
