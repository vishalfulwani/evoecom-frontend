import React from "react";

// Utility function to generate a random background color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const UserAvatar: React.FC<{ name: string }> = ({ name }) => {
  // Get the first letter of the name
  const firstLetter = name.charAt(0).toUpperCase();
  
  return (
    <div
      style={{
        width: '65px',
        height: '65px',
        borderRadius: '50%',
        backgroundColor: getRandomColor(),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
      }}
      className="avatar"
    >
      {firstLetter}
    </div>
  );
};

export default UserAvatar;
