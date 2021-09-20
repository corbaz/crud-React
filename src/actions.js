import { firebaseApp } from "./conexion";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";

const db = getFirestore(firebaseApp);

export const getCollection = async (coleccion) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    const data = collection(db, coleccion);
    const dataSnapshot = await getDocs(data);
    const dataList = dataSnapshot.docs.map((doc) => doc.data());
    result.statusResponse = true;
    result.data = dataList;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const addDocument = async (coleccion, data) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    // Agrega el registro ingresado como un (documento addDoc)
    // a la collecion de la db
    const response = await addDoc(collection(db, coleccion), data);

    // armamos nuestro obj result con statusResponse: true
    // y result.data con el id que nos devuelve el metodo add() en response.id

    result.statusResponse = true;
    result.data = { id: response.id };
  } catch (error) {
    result.error = error;
  }
  return result;
};
