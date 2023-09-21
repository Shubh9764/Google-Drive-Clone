import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { ROOT_FOLDER } from "../hooks/useFolder";
import { Link } from "react-router-dom";

const FolderBreadCrumbs = ({ currentFolder }) => {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];
  return (
    <Breadcrumb
      className="flex-grow-1"
      listProps={{ className: "bg-white p-0 m-0" }}
    >
      {[...path].map((folder, index) => (
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{
            to: folder.id ? `/folders/${folder.id}` : `/`,
            state: {...folder,path:path.slice(1,index)} 
          }}
          key={folder.id}
          className="text-truncate d-inline-block"
          style={{ maxWidth: "150px" }}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          style={{ maxWidth: "200px" }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default FolderBreadCrumbs;
