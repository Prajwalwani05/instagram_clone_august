import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TokenContext from "../context/TokenContext";
import "./Dashboard.css";
import Navbar from "./Navbar";
import Suggestions from "./Suggestions";
// import { AiOutlineHeart } from "react-icons/ai";

const DashBoard = () => {
  const [message, setMessage] = useState("");
  const { token, setToken } = useContext(TokenContext);
  const [name, setName] = useState("");
  const [greet, setGreet] = useState("");
  const [posts, setPosts] = useState([]);
  const initialLikes = new Array(posts.length).fill(0);
  const [likes, setLikes] = useState(initialLikes);
  const [likedStates, setLikedStates] = useState(
    new Array(posts.length).fill(false)
  );
  // const [likedAnimation, setLikedAnimation] = useState([]);
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

      axios
        .get("https://instagram-express-app.vercel.app/api/post/all-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setPosts(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);
  // Showing Posts

  const handleTime = (time) => {
    // Input date and time string
    var inputDateTime = "2023-08-04T09:21:44.485Z";

    // Parse the input string into a Date object
    var dateObj = new Date(inputDateTime);

    // Get the individual date and time components
    var day = dateObj.getUTCDate();
    var month = dateObj.getUTCMonth() + 1; // Add 1 because months are zero-indexed
    var year = dateObj.getUTCFullYear() % 100; // Get the last two digits of the year
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();

    // Ensure single-digit day and month are formatted with leading zeros
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    // Format the date and time as required
    var formattedDateTime =
      day + "/" + month + "/" + year + " - " + hours + ":" + minutes;

    return formattedDateTime;
  };
  const handleLikes = (index) => {
    const newLikes = [...likes];
    const newLikedStates = [...likedStates];
    newLikes[index] += newLikedStates[index] ? -1 : 1;
    newLikedStates[index] = !newLikedStates[index];
    console.log(newLikes);
    setLikes(newLikes);
    setLikedStates(newLikedStates);
  };
  useEffect(() => {
    if (likes.length !== posts.length) {
      const newLikes = new Array(posts.length).fill(0);
      const newLikedStates = new Array(posts.length).fill(false);
      setLikes(newLikes);
      setLikedStates(newLikedStates);
    }
  }, [likes, posts]);

  const handleText = (text) => {
    if (text === "") {
      text += "Here is my new Post!";
      return text;
    } else return text;
  };

  const handleDoubleClick = (index) => {
    handleLikes(index);
  };

  return (
    <div className="mainDashboard">
    <div>  <Navbar /></div>
      <div className="dashboardContainer">
        <div className="greetDiv">
          <p className="greet">
            {greet} <span>{name}</span>
          </p>
          <h3 className="message">{message}</h3>
        </div>
        <div className="posts">
          {posts.map((post, index) => (
            <div
              className="post"
              key={post.id}
              onDoubleClick={handleDoubleClick} >
            <div className="postImg">
                <img src={post.image} alt="img" />{" "}
              </div>
              <div className="postContent">
                <p className="text">{handleText(post.text)}</p>

                <div className="like-button">
                  <span
                    onClick={(e) => handleLikes(index)}
                    className={`material-symbols-outlined ${
                      likedStates[index] ? "liked-icon" : "unliked-icon"
                    }`}
                  >
                    favorite
                  </span>
                  <p className="like">{likes[index]}</p>
                </div>
              </div>
              <p className="time">Posted on : {handleTime(post.createdAt)}</p>
            </div>
          ))}
        </div>
      </div>
      <div><Suggestions /></div>
    </div>
  );
};

export default DashBoard;
