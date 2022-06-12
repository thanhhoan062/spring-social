import React from 'react';
import AuthService from '../services/auth.service';
import './component.css';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>

    // <div className="profile-container">
    //   <div className="container">
    //     <div className="profile-info">
    //       <div className="profile-avatar">
    //         {currentUser.imageUrl ? (
    //           <img src={currentUser.imageUrl} alt={currentUser.name} />
    //         ) : (
    //           <div className="text-avatar">
    //             <span>{currentUser.name && currentUser.name[0]}</span>
    //           </div>
    //         )}
    //       </div>
    //       <div className="profile-name">
    //         <h2>{currentUser.name}</h2>
    //         <p className="profile-email">{currentUser.email}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default Profile;
