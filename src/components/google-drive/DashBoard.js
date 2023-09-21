import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import NavbarCom from "./Navbar";
import AddFolderButton from "./AddFolderButton";
import useFolder from "../hooks/useFolder";
import Folder from "./Folder.js";
import { useLocation, useParams } from "react-router-dom";
import FolderBreadCrumbs from "./FolderBreadCrumbs";
import AddFileButton from "./AddFileButton";
import File from "./File";

const Dashboard = () => {
  const { folderId } = useParams();
  const {state = {}} = useLocation();
  const { folder, childFolders,childFiles } = useFolder(folderId,state?state.folder:null);
  return (
    <>
      <NavbarCom />
      <Container fluid>
        <div className="d-flex align-items-center mt-3">
          <FolderBreadCrumbs currentFolder={folder} />
          <AddFileButton currentFolder = {folder}/>&nbsp;
          <AddFolderButton currentFolder={folder} />
          
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((child) => (
              <div id={child.id} style={{ maxWidth: "150px" }} className="p-2">
                <Folder folder={child} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr/>}
          {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((child) => (
              <div id={child.id} style={{ maxWidth: "150px" }} className="p-2">
                <File file={child} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
