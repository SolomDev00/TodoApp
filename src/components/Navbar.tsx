import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "./schema/Button";
import toast from "react-hot-toast";

const Navbar = () => {
  // ** Cookies
  const cookie = new Cookies();
  const userData = cookie.get("userLogged");

  const Logout = () => {
    cookie.remove("userLogged");
    toast.success("Logout is done, you will navigate after 1 seconds!", {
      position: "bottom-center",
      duration: 1500,
    });
    setTimeout(() => {
      location.replace("/login");
    }, 1500);
  };

  return (
    <nav className="max-w-2xl mx-auto mt-7 mb-20 px-3 py-5">
      <ul className="flex items-center justify-between">
        <li className="text-gray-500 duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        {!userData ? (
          <p className="flex items-center space-x-3">
            <li className="text-gray-500 duration-200 font-semibold text-lg">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="text-gray-500 duration-200 font-semibold text-lg">
              <NavLink to="/login">Login</NavLink>
            </li>
          </p>
        ) : (
          <div className="flex flex-row items-center text-indigo-600 space-x-2">
            <h3 className="text-gray-500 text-sm font-semibold">
              <div className="flex space-x-3">
                <NavLink to={"/todos"}>Todos</NavLink>
                <NavLink to={"/profile"}>
                  Hello, {userData.user.username} 👋
                </NavLink>
              </div>
            </h3>
            <Button onClick={Logout} size={"sm"}>
              Logout
            </Button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
