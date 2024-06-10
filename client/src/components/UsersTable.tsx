import { UserT } from "../types/type";
import RoleBadge from "./common/RoleBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faTrash,
  faPersonCircleCheck,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import useModal from "../hooks/useModel";
import { toast } from "react-toastify";
import { useAppDispatch } from "../state";
import { deleteUser, setEditUserId, verifyUser } from "../state/users";
import NotVerifiedBadge from "./common/NotVerifiedBadge";
import Modal from "./Modal";
import EditUserForm from "./forms/users/EditUserForm";

interface UsersTableProps {
  users: UserT[];
}

function UsersTable({ users }: UsersTableProps) {
  const dispatch = useAppDispatch();
  const {
    open: openEdit,
    close: closeEdit,
    name: nameEdit,
  } = useModal("edit_user");

  const handleDeleteUser = async (id: number) => {
    try {
      await dispatch(deleteUser(id)).unwrap();

      toast.success("User deleted");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleVerifyUser = async (id: number) => {
    try {
      await dispatch(verifyUser(id)).unwrap();

      toast.success("User verified!");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const onEditUserClick = async (id: number) => {
    dispatch(setEditUserId(id));
    openEdit();
  };

  return (
    <>
      <table className="table table-lg">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <Row
              user={user}
              handleDeleteUser={handleDeleteUser}
              handleVerifyUser={handleVerifyUser}
              onEditUserClick={onEditUserClick}
              key={user.id}
            />
          ))}
        </tbody>
      </table>
      <Modal
        name={nameEdit}
        body={<EditUserForm handleSave={() => closeEdit()} />}
      />
    </>
  );
}

interface RowProps {
  user: UserT;
  onEditUserClick: (id: number) => void;
  handleDeleteUser: (id: number) => void;
  handleVerifyUser: (id: number) => void;
}

function Row({
  user,
  handleDeleteUser,
  handleVerifyUser,
  onEditUserClick,
}: RowProps) {
  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.phone}</td>
      <td>{user.email}</td>
      <td>
        <div className="flex justify-between items-center space-x-2">
          <RoleBadge role={user.role} />
          {!user.isVerified && <NotVerifiedBadge />}
        </div>
      </td>
      <td>
        <div className="dropdown dropdown-hover dropdown-end">
          <div tabIndex={0} role="button" className="btn">
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="text-md text-white"
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1000] menu p-2 shadow bg-base-300 rounded-box w-52"
          >
            {user.role !== "admin" && (
              <li>
                <div onClick={() => handleDeleteUser(user.id)}>
                  <FontAwesomeIcon icon={faTrash} className={"text-red-500"} />
                  Delete
                </div>
              </li>
            )}
            <li>
              <div onClick={() => onEditUserClick(user.id)}>
                <FontAwesomeIcon icon={faPen} className="text-blue-500" />
                Edit
              </div>
            </li>
            {user.role === "user" && !user.isVerified && (
              <li>
                <div onClick={() => handleVerifyUser(user.id)}>
                  <FontAwesomeIcon
                    icon={faPersonCircleCheck}
                    className="text-green-500"
                  />
                  Verify
                </div>
              </li>
            )}
          </ul>
        </div>
      </td>
    </tr>
  );
}

export default UsersTable;
