"use client";
import React, { useState, useEffect } from "react";
import UsersCard from "./UsersCard";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row } from "react-bootstrap";
interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export default function HomePage() {
  const [usersData, setUsersData] = useState([]);
  const [userProfile, setUserProfiles] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsersData(data.data);
      }
      catch (error) {
        console.error("Error while fetching data:", error);
      }
    }
    fetchUserData();
  }, [])

  useEffect(() => {
    const fetchUserProfile = async (name: string) => {
      try {
        const response = await axios.get(`https://api.dicebear.com/7.x/initials/svg?seed=${name}`);
        setUserProfiles((prevProfiles) => ({
          ...prevProfiles,
          [name]: response.data
        }));
      } catch (error) {
        console.error("Error fetching user profile for:", name, error);
      }
    };

    usersData.forEach((users: any) => {
      fetchUserProfile(users.username);
    });
  }, [usersData]);

  const handleDeleteUser = (deleteId: any) => {
    const remainingUsers = usersData.filter((item, ind) => ind !== deleteId);
    setUsersData(remainingUsers);
  }

  return (
    <div className="m-4">
      <Row xs={1} md={4} className="g-4">
        {usersData && usersData.length > 0 && usersData.map((users, ind) => (
          <UsersCard
            propkey={ind}
            data={users}
            profile={userProfile}
            handleDelete={handleDeleteUser}
          />
        ))}
      </Row>
    </div>
  )
}
