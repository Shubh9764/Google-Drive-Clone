import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { createPortal } from "react-dom";
import { schema, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../../contexts/AuthProvide";
import { ROOT_FOLDER } from "../hooks/useFolder";
import { addDoc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { ProgressBar, Toast } from "react-bootstrap";

const AddFileButton = ({ currentFolder }) => {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currentUser } = useAuth();
  function handleUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const path = currentFolder.path.join("/");
    console.log(file);
    if (currentFolder == null || file == null) return;

    const id = uuidV4(0);

    setUploadingFiles((prev) => [
      ...prev,
      { id: id, name: file.name, progress: 0, error: false },
    ]);
    const parentPath =
      currentFolder.path.length > 0
        ? `${currentFolder.path.map((folder) => folder.name).join("/")}`
        : "";
    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${parentPath}/${file.name}`
        : `${parentPath}/${currentFolder.name}/${file.name}`;

    const uploadTaskRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);
    const uploadTask = uploadBytesResumable(uploadTaskRef, file)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes
        setUploadingFiles(prev => {
            return prev.map(
                uploadFile => {
                    if(uploadFile.id  === id){
                        return { ...uploadFile, progress: progress}
                    }
                    return uploadFile;
                }
              
            )
        })


      },
      () => {
        setUploadingFiles( prev => {
            return prev.map(
                uploadFile => {
                    if(uploadFile.id  === id){
                        return { ...uploadFile, error:true}
                    }
                    return uploadFile;
                }
              
            )
      },)},
      () => {
        setUploadingFiles( prev => {
            return prev.filter(
                uploadFile => {
                    return uploadFile.id !== id
                }
              
            )
      },)
     
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("here")
            getDocs(query(schema.files,where("name","==",file.name),
            where('userId','==',currentUser.uid),
            where('folderId','==',currentFolder.id)))
            .then(snapshot => {
                console.log(snapshot.docs)
                if(snapshot.docs.length > 0 ){
                    snapshot.forEach(doc => {
                        console.log(doc.url)
                        console.log(url)
                      updateDoc(doc.ref,{url:url})
                      .then((res) => {
                        console.log("success")
                      })
                      .catch((e) => {
                        console.error(e)
                      })
                    });
                }
                else{
                    addDoc(schema.files, {
                        url: url,
                        name: file.name,
                        createdAt: serverTimestamp(),
                        folderId: currentFolder.id,
                        userId: currentUser.uid,
                      });
                }
            })
      
        });
      }
    );
  }
  return (
    <>
      <label className="btn btn-outline-success btn-sm m-0">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        ></input>
      </label>
      {uploadingFiles.length > 0 &&
        createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast key={file.id}>
                <Toast.Header
                closeButton={file.error}
                  className="text-truncate w-100 d-block"
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "Error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default AddFileButton;
