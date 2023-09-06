import React, { useState ,useEffect , useContext} from 'react'
import "./Create.css";
import Profile from "../Profile/Profile"
// import ImageContext from "../../context/ImageContext";
import {storage} from "../../firebase";
import {ref , uploadBytes , listAll , getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import ImageProvider from '../../context/ImageProvider';
import Navbar from "../Navbar/index";



const Create = ({imageList ,setImageList}) =>{

  const [imageUpload , setImageUpload] = useState(null);
  
  // let {imageList , setImageList} = useContext(ImageContext);
  const imageListRef = ref(storage , "images/");
  

   function uploadImage(){
  if(imageUpload == null) return ;
  const imageRef = ref(storage , `images/${imageUpload.name + v4()}`);
  uploadBytes(imageRef , imageUpload).then(()=>{
    alert("Uploading");
    // console.log(props)
  })
};

useEffect(() => {
  listAll(imageListRef)
    .then((response) => {
      const urls = [];
      response.items.forEach((item) => {
        getDownloadURL(item)
          .then((url) => {
            urls.push(url);
          })
          .catch((error) => {
            console.error("Error fetching image URL:", error);
          });
      });
      setImageList(urls); // Set the imageList state here
      console.log("Image URLs fetched:", urls);
    })
    .catch((error) => {
      console.error("Error listing images:", error);
    });
}, []);




  return (
    <>
    <Navbar />
    <div className='Create'>
      <div className='createContainer'>
        <h1>Share your beautiful memories here ! </h1>
      <input className='uploadInput' type='file' onChange={(e)=>setImageUpload(e.target.files[0])} />
      <button className='uploadBtn' onClick={uploadImage}>Upload</button>
     
     <div  className="imageDiv">
     { 
     imageList.length > 0 ?(
        imageList.map((url , index)=>(        
        
            <img key={index} className='uploadImg' src={url} effect="blur" width={333} height={400} />
        ))
     ): (
      <p>Loading...</p>
     )
      }
     </div>
     </div>
    </div>
    
    </>
  )
}

export default Create;