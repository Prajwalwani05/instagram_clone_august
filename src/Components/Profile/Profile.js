import React,{useState , useContext} from 'react'
// import ImageContext from "../../context/ImageContext";
const Profile = ({imageList}) => {
// let imageContext = useContext(ImageContext);
// let {imageList } = imageContext;
console.log(imageList);
if (imageList === null || imageList.length === 0) {
  return <p>Loading...</p>;
}


  return (
    <div> <h1>Hello</h1>
     {
      imageList.map((image)=>{
      return <img src={image} />
      })
     }
    </div>
  )
}

export default Profile;