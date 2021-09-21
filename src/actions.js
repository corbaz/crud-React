import { firebaseApp } from "./conexion";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export const getCollection = async (coleccion) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    const dataSnapshot = await getDocs(collection(db, coleccion));
    // const dataId = dataSnapshot.docs.map((item) => item.id);
    // const dataName = dataSnapshot.docs.map((item) => item.data().name);
    const dataFirebaseDocs = dataSnapshot.docs.map((item) => {
      return [
        {
          id: item.id,
          name: item.data().name,
        },
      ];
    });
    result.data = dataFirebaseDocs.map((item) => item[0]);
    result.statusResponse = true;
  } catch (error) {
    result.error = `Error en actions.js - en la funcion getCollection - ${error}`;
  }
  return result;
};

export const addDocument = async (coleccion, data) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    // Agrega el registro ingresado como un (documento addDoc)
    // a la collecion de la db
    const response = await addDoc(collection(db, coleccion), data);

    // armamos nuestro obj result
    // con statusResponse: true
    // y result.data con el id que nos devuelve el metodo addDoc() y que
    // luego se usara el response.id como result.data.id
    result.data = response;
    result.statusResponse = true;
  } catch (error) {
    result.error = `Error en actions.js - en la funcion addDocument - ${error}`;
  }
  return result;
};

export const getOneDocument = async (coleccion, id) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    // Agrega el registro ingresado como un (documento addDoc)
    // a la collecion de la db
    const response = doc(collection(db, coleccion, id));

    // armamos nuestro obj result con statusResponse: true
    // y result.data con el id que nos devuelve el metodo add() en response.id
    result.data = { id: response.id, ...response.data() };
    result.statusResponse = true;
  } catch (error) {
    result.error = `Error en actions.js - en la funcion getOneDocument - ${error}`;
  }
  return result;
};

export const updateOneDocument = async (coleccion, id, data) => {
  const result = { statusResponse: false, error: null };

  try {
    // enlazamos el documento x id, de la coleccion(tasks), de la db de Firebase

    const response = doc(db, coleccion, id);

    //Actualizamos del enlace de response
    //los datos nuevos (data) que son los campos del documento ecepto el id
    await updateDoc(response, data);

    // armamos nuestro obj result con statusResponse: true
    result.statusResponse = true;
  } catch (error) {
    result.error = `Error en actions.js - en la funcion updateOneDocument - ${error}`;
  }
  return result;
};

export const deleteOneDocument = async (coleccion, id) => {
  const result = { statusResponse: false, error: null };

  try {
    // enlazamos el documento x id, de la coleccion(tasks), de la db de Firebase

    //Actualizamos del enlace de response
    //los datos nuevos (data) que son los campos del documento ecepto el id
    //const response = doc(db, coleccion, id);
    //await deleteDoc(response);
    //await db.collection(coleccion).doc(id).delete();
    deleteDoc(doc(db, coleccion, id));
    // armamos nuestro obj result con statusResponse: true
    result.statusResponse = true;
  } catch (error) {
    result.error = `Error en actions.js - en la funcion deleteOneDocument - ${error}`;
  }
  return result;
};
