import React, { useState} from "react";
import "./searchbar.css";
//import hero from "./images/hero6.jpg";
import "./profile.css";
import "./Navbar.css"
import { GoLocation } from "react-icons/go";
import { RiContactsLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";




function SearchBar() {
  const [data, setData] = useState({});
  const [userName, setUsername] = useState("");
  const [repos, setRepos] = useState([]); 
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    setUsername(e.target.value);
   
  };
   
  const handleSumbit = async (e) => {
    e.preventDefault();

    const profile = await fetch(`https://api.github.com/users/${userName}`);
    const profileJson = await profile.json();
    console.log(profileJson);
    const repositories = await fetch( `https:api.github.com/users/${userName}/repos?sort=updated`);
   const repoJson = await repositories.json();
    //  console.log(repoJson)
    if (profileJson) {
      setData(profileJson);
      setRepos(repoJson);
      //console.log(profileJson.message)
      // if (profileJson.message==="Not Found"){
      //   setError("User not found")
      // }
      // else {
      //     setData(profileJson);
      //     setRepos(repoJson);
    }
  };
   

  return (
    <div className="form ">
      {error}
      <form onSubmit={handleSumbit}>
        <input
          className="input"
          type="text"
          placeholder="Github Username"
          onChange={handleSearch}
          value={userName}
        />
        <button className="btn">Search</button>
      </form>
      {!data.avatar_url ? (
        ""
      ) : (
        <img className="Logo" src={data.avatar_url} alt="my hero" />
      )}
      <div className="navba p">
        <h3>{data.name}</h3>
        <p>{data.login}</p>
        <p>{data.bio}</p>
        <p> {data.followers} followers</p>

        <p>
          <RiContactsLine />
          {data.following} following
        </p>
        <p>
          <GoLocation />
          {data.location}
        </p>
        <p>{data.twitter_username}</p>
      </div>

      <h1>Repositories</h1>
      {repos.slice(0,7).map((repo) => (
        <div key={repo.name}>
          <li className="li">
            <FaGithub />
            <a href={repo.html_url} target="_blank">
              {repo.name}
            </a>
          </li>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
