import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <button className="authBtn" onClick={() => logout()}>
      {" "}
      Log Out{" "}
    </button>
  );
}
