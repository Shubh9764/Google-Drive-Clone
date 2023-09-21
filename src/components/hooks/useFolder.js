import React, { useReducer, useEffect } from "react";
import { db, schema } from "../../firebase";
import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthProvide";

export const ROOT_FOLDER = { name: "ROOT", id: null, path: [] };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
};
const ACTIONS = {
  SELECT_FOLDER: "select folder",
  UPDATE_FOLDER: "update folder",
  SET_CHILD_FOLDERS: "set child folders",
};

const useFolder = (folderId = null, folder = null) => {
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {
        folderId,
        folder,
      },
    });
  }, [folderId, folder]);
  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }
    getDoc(doc(db, "folders", folderId))
      .then((doc) => {
        console.error()
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: schema.formatDoc(doc) },
        });
      })
      .catch((e) => {
        console.error(e)
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    const q = query(
      schema.folders,
      where("parentId", "==", folderId),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt")
    );
    return onSnapshot(q, (querySnap) => {
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: querySnap.docs.map(schema.formatDoc) },
      });
    });
    // getDocs(q)
    //   .then(() => {})
    //   .catch(() => {});
  }, [folderId,currentUser]);

  useEffect(() => {
    const q = query(
      schema.files,
      where("folderId", "==", folderId),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt")
    );
    return onSnapshot(q, (querySnap) => {
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: { childFiles: querySnap.docs.map(schema.formatDoc) },
      });
    });
  }, [folderId,currentUser]);
  return state;
};

export default useFolder;
