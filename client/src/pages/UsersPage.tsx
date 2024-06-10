import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useAppDispatch, useAppSelector } from "../state";
import { getUsers } from "../state/users";
import UsersTable from "../components/UsersTable";

function UsersPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    dispatch(getUsers())
      .unwrap()
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <span className="loading loading-lg mt-8"></span>;
  }

  return (
    <PageWrapper title="Users">
      <UsersTable users={users} />
    </PageWrapper>
  );
}

export default UsersPage;
