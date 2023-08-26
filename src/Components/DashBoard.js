import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TokenContext from "../context/TokenContext";
import "./Dashboard.css";

const DashBoard = () => {
  const [message, setMessage] = useState("");
  const { token, setToken } = useContext(TokenContext);
  const [name, setName] = useState("");
  const [greet, setGreet] = useState("");
  const [posts , setPosts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get("https://instagram-express-app.vercel.app/api/auth/zuku", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setName(response.data.data.user.name);
          setMessage(response.data.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
      function getGreeting() {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
          setGreet("Good morning!");
        } else if (currentHour >= 12 && currentHour < 18) {
          setGreet("Good afternoon!");
        } else {
          setGreet("Good evening!");
        }
      }
      getGreeting();
    
      axios.get("https://instagram-express-app.vercel.app/api/post/all-posts" , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res=>{
        console.log(res.data.data);
        setPosts(res.data.data);
      })
      .catch(err=>{
        console.log(err)
      });

    }
},[token]);
// Showing Posts 

  
  return (
    <div className="dashboardContainer">
      <p>
        {greet} <span>{name}</span>
      </p>
      <h3>{message}</h3>
      <div className="posts">
        {
            posts.map((post , index)=>(
                <div className="post">
                    <img src={post.image} alt="img" />
                </div>
            ))
        }
      </div>
    </div>
  );
};


export default DashBoard;
