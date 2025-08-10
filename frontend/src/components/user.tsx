import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { User } from "@heroui/user";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";

export const UserIcon = () => {
  const { logout,user } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User

          as="button"
          avatarProps={{
            isBordered: true,
            src: ""
          }}
          className="transition-transform"
          description={`${user?.username || "Guest"}`}
          name={user?.username}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{`@${user?.username || "Guest"}`}</p>
        </DropdownItem>
        {user ? (
          <DropdownItem key="home">
            <Link to="/"> Home</Link>
          </DropdownItem>
        ) : (
          <></>
        )}
        <DropdownItem key="rps" className="h-14 gap-2">
          <Link to="/onboarding">Pedra Papel Tesoura</Link>
        </DropdownItem>
        {user?.role === "admin" ? (
          <DropdownItem key="dasboard">
            <Link to="/dashboard">Dashboard</Link>
          </DropdownItem>
        ) : (
          <></>
        )}
        {user ? (
          <DropdownItem key="logout" color="danger" onPress={handleLogout}>
            Log Out
          </DropdownItem>
        ) : (
          <DropdownItem key="login" color="danger" onPress={handleLogin}>
            Login
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};