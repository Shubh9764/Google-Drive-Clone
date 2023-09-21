import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
const Folder = ({ folder }) => {
  return (
    <Button
    variant="outline-dark"
      to = {folder.id ? `/folders/${folder.id}` : `/`}
      state={{ folder: folder }}
      as={Link}
      className="text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFolder} className="mr-2" />
      &nbsp; {folder.name}
    </Button>
  );
};

export default Folder;
