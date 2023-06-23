import { useUser } from "../context/UserContext";

function useImage(img) {

 try {
    const imgname = JSON.parse(img);
    return imgname.name
 } catch (error) {
    return 'not-found.png'
 }
 
}

export default useImage;
