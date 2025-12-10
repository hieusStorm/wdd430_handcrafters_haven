import AddUser from "../components/AddUser";
import UserList from "../components/UserList";

export default function UsersPage() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>User Management</h1>
      <AddUser />
      <UserList />
    </main>
  );
}
