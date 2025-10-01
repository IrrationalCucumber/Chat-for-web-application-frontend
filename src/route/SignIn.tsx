import * as React from "react";
import axios from "axios";

export default function SignIn() {
  const [userCred, setUserCred] = React.useState({
    username: "",
    password: "",
  });
  const apiURL = import.meta.env.VITE_URL; //add api for backend in env file

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userCred.username != "" || userCred.password != "") {
      try {
        alert("check");
        axios.post(`${apiURL}/sign-in`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      Sign In
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="Username...."
          name="username"
          value={userCred.username}
          onChange={(e) =>
            setUserCred({ ...userCred, username: e.target.value })
          }
        />
        <input
          placeholder="Password..."
          name="password"
          value={userCred.password}
          onChange={(e) =>
            setUserCred({ ...userCred, password: e.target.value })
          }
        />
        <button type="submit"></button>
      </form>
    </>
  );
}
