import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const [users, setUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const responseData = await sendRequest("http://localhost:5000/api/users");
        setUsers(responseData.users);
      };
      fetchUsers();
    } catch (err) {}
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {users && !isLoading && <UsersList items={users} />}
    </React.Fragment>
  );
};

export default Users;
