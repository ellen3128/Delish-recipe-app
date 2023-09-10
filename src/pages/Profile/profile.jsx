import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // If user is not authenticated, redirect to home route
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If the authentication status is true but the confirmation is still loading, render a loading message
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // If the user is authenticated and loading is complete, render the user's profile data
  return (
    <div className="container-user">
        
        <img className="userpic" src={user.picture} alt={""} />
        <h2 className="userName">Welcome, <span style={{color:"#00473D", fontWeight:"800"}}>{user.name}</span></h2>
        <p className="userEmail">{user.email}</p>
      {/* You can add more user details here, such as user.email, user.picture, etc. */}
    </div>
  );
};

export default Profile;
