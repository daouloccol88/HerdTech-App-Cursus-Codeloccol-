"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MaterialInput from "@/components/MaterialInput";

export default function LoginPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const toggleLight = () => {
    document.body.classList.toggle("light");
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    router.push("/dashboard"); // redirect after login
  };

  // REGISTER
  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      alert("Email already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Registration successful! Please login.");
    router.refresh; // redirect to login after sign-up
  };

  return (
    <div>
      <div className="container-fluid thm-bg-light">
        <div className="row" style={{ height: "100vh" }}>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="container ">
              <div className="d-flex justify-content-between">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    width="90"
                    height="90"
                    viewBox="0 0 158.8 158.8"
                  >
                    <path
                      d="m107.2 160.8 1.6-4.7c1.4-3.3 4.4-6.4 7.4-7.9 1.5-.7 2-.8 4.2-.8 3.1 0 4.4.5 6.7 2.7l1.6 1.5h3.3c3.3 0 3.4 0 5.1-.9 6.6-3.3 8.6-11.5 4.5-18.4-1-1.6-4.4-5.1-4.2-4.2l.9 2.9c.5 2 .6 2.7.6 5-.2 4.5-1.5 6.3-4.5 6.3q-3.7.1-4.2-4.3-.5-4.1-3.6-4-1.7 0-3.4 3.1-.6 1.4-1.8 2.1c-1 .7-1.3.8-3.1.8s-2.2-.1-3.2-.8a5 5 0 0 1-2.1-4.1c0-1.3.2-1.8 1-3.2 1.3-2.2 1.4-2.8 1-4q-.3-2-4.4-3.4c-2.2-.8-4.5-2-4.5-2.4l1-.4q1.8-.3 3.3-1.6c.7-.5 1-.6 6.6-.8 8.5-.2 13 .4 17.6 2.5a23 23 0 0 1 11.8 12.5c.7 2 1 6.8.5 9-.4 2-1.8 4.8-3.2 6.5s-4 3.6-6.3 4.5-6 1.1-8.3.6l-1.6-.3-1.1 1a16 16 0 0 1-6 3.6c-1 .2-4 .7-6.7 1zm-25.5-5.4a32 32 0 0 1-11-18c-.8-3-1-9.7-.6-13 .7-5.2 2.8-11.6 5.4-16.3 1.4-2.6 1.7-3 2.6-3q2.3 0 4.4-2 1.3-1.2 1.4-1.5l-2.5.5c-4.2 1.2-6.6.6-9.8-2.7-1-1-1.7-2-1.7-2.1 0-.5 2-1.9 3.5-2.3q3-1 6.5.6c2.3 1 3.6 1.2 5.1.8q2.3-.3-.4-1.1c-3-1.1-5-4-5-7.1s1.7-6.1 4.3-7.8c.9-.5 3.2-1.3 3.2-1l-1 1.9c-1 2-1.5 4.4-1.3 5.7.3 1.2 1.3 3 2 3.3s1 .2 2.7-.3c2.6-.9 6-1 8.1-.2.8.3 1.8.5 2.1.5 1.6 0 4.4-2.4 5-4.4.4-1.2.4-3.4.1-5q-.4-1.4.3-.8.6.3 1.3 1.5c3 4.6 1.6 10.2-3 12.5l-1.2.6a35 35 0 0 0 2.8 4.6V96l1.3-.6c1.9-1 5-1 6.8 0q1.3.7 1.8 1.3c.5.5.5.6.1 1.1a16 16 0 0 1-4.1 4c-1 .5-1.6.6-3.5.6h-2.2l.4 2c.7 2.6.7 2.6-.3 1.7s-1.4-1.6-2.7-5.4c-1.8-5.3-3.3-7.6-5.3-8.5-1.8-.8-7.3-.6-8.7.3-.4.3-.2.5 3.3 3 3 2 4 3.1 6.1 7.3 3 5.6 4.7 6.8 10 7 3.1.2 3.6.4 3.7 1.7q.2 2.9-.7 4.7c-1 2.2-2.5 2.8-7.3 3.2-7.4.7-14.6-1.4-18.6-5.4-1.4-1.5-1.8-1.7-2.4-1.5q-.7 0-.7.4c0 .6 2 3 3.3 4.4l1.5 1.4-1.3 1.5a28 28 0 0 0-6.4 25c.7 2.5 2.7 6.9 4.2 8.8 1 1.2 1 1.4.6 2q-.3.4-.6.5zm25.6-40.7q.5-.8-.9-1-1.2-.1-1.3-1.1-.2-1.1-1-.8c-.4.4-.5 1.4 0 2.1.5 1 2.4 1.5 3.2.8m-19 38.8c-5-2.6-6.5-13.5-3.1-22l2-4c1.2-2 4.3-5.5 5.2-6 .3-.1 6.5.4 6.7.6l.5 1.7q.5 2 4.2 8.6c2.3 4.3 2.4 8.4 0 10.7-1.2 1.4-2.3 1.7-5 1.8q-3.2 0-3.8 1.3c-.2.4-.5 1.7-.7 3-.3 3-.8 3.7-2.3 4.4s-2.2.6-3.6-.1"
                      style={{ fill: "#65b545", strokeWidth: ".264583" }}
                      transform="translate(-29.1 -40.9)"
                    />
                  </svg>
                </div>
                <div>
                  <div className="d-flex">
                    <div>
                      <div className="dropdown">
                        <button
                          className="btn dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="bi bi-gear-fill fs-2"></i>
                          Paramètres
                        </button>
                        <ul className="dropdown-menu thm-bg-light">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={toggleLight}
                            >
                              <i className="bi bi-moon-fill"></i>/
                              <i className="bi bi-sun-fill"></i>
                              Mode Sombre
                            </button>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <i className="bi bi-globe"></i> Langue
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="text-center">
                {isLogin
                  ? "Bon retour sur HerdTech-App"
                  : "Bienvennue sur HerdTech-App"}
              </h1>
              <p className="fs-5 my-4">
                Veuillez entrez vos informaions pour vous{" "}
                {isLogin ? "Connectez" : "Inscrire"}
              </p>

              <form onSubmit={isLogin ? handleLogin : handleRegister}>
                <div>
                  <MaterialInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={"Enter your email"}
                    width="100%"
                  />
                </div>

                <div className="pt-4">
                  <MaterialInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={"Enter your password"}
                    width="100%"
                  />
                </div>

                {!isLogin && (
                  <div className="pt-4">
                    <MaterialInput
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={"type your password to confirm"}
                      width="100%"
                    />
                  </div>
                )}

                <button
                  className="btn thm-bg-primary text-white fw-semibold mt-4 fs-4 px-5"
                  type="submit"
                >
                  {isLogin ? "Login" : "Register"}
                </button>
              </form>

              <div className="row pt-4">
                <div className="col-lg-6 col-md-12">
                  {" "}
                  <p className="py-2 fs-5">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="checkDefault"
                    />
                    Se souvenir de moi
                  </p>
                </div>
                <div className="col-lg-6 col-md-12">
                  {isLogin ? (
                    <span className="fs-5">Vous n'avez pas de compte ?</span>
                  ) : (
                    <span className="fs-5">Vous avez déja un compte ?</span>
                  )}
                  <a onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? (
                      <span className="thm-text-primary fs-5 text-decoration-underline">
                        Cliquez ici pour vous inscrire
                      </span>
                    ) : (
                      <span className="thm-text-primary fs-5 text-decoration-underline">
                        Cliquez ici pour vous inscrire
                      </span>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 bg-login d-none d-sm-block"></div>
        </div>
      </div>
    </div>
  );
}
