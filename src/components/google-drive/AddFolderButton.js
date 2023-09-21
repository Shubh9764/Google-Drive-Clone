import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthProvide";
import { ROOT_FOLDER } from "../hooks/useFolder";
const AddFolderButton = ({ currentFolder }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false)
  const { currentUser } = useAuth();
  const openModel = () => {
    setOpen(true);
  };
  const closeModel = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentFolder == null) return;
    setLoading(true)
    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }
    try {
      const docRef = await addDoc(collection(db, "folders"), {
        name: name,
        parentId: currentFolder.id,
        userId: currentUser.uid,
        path: path,
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log("Document written with ID: ", e);
    }
    setName("");
    closeModel();
    setLoading(false)
  };
  return (
    <>
      <Button onClick={openModel} variant="outline-success" size="sm">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={closeModel}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="test"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModel}>
              Close
            </Button>
            <Button variant="success" type="submit" disabled = {loading}>
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddFolderButton;
