import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile");

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>My Profile</h2>
      <p>
        <strong>Name:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Image:</strong> {user.image}
      </p>
      <p>
        <strong>Lastname:</strong> {user.endname}
      </p>
      <p>
        <strong>Address:</strong> {user.address}
      </p>
      <p>
        <strong>Contact:</strong> {user.contact}
      </p>
      <p>
        <strong>Occupation:</strong> {user.occupation}
      </p>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default ProfilePage;
