import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    { id: "u1", name: "User 1", image: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745", places: 1 },
    { id: "u2", name: "User 2", image: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png", places: 3 },
    { id: "u3", name: "User 3", image: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-with-beard-vector-ilustration-png-image_6110777.png", places: 6 },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
