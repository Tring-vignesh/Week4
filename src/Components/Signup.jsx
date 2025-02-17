import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import validator from "validator";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidName, setIsValidName] = useState(true);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);
    setEmailExists(userExists);

    if (email) {
      setIsValidEmail(validator.isEmail(email));
    }

    if (password) {
      setIsValidPassword(validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }));
    }

    if (name) {
      setIsValidName(name.trim().length > 0);
    }
  }, [email, password, name]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidName) {
      setError("Name cannot be empty or only spaces.");
      setSuccess("");
      return;
    }

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      setSuccess("");
      return;
    }

    if (emailExists) {
      setError("Email already exists. Please use a different email.");
      setSuccess("");
      return;
    }

    if (!isValidPassword) {
      setError("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      setSuccess("");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { name, email, password, personas: [] };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Account created successfully! You can now sign in.");
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="d-flex justify-content-center bg-light">
      <div className="card p-4 shadow" style={{ width: "24rem" }}>
        <h2 className="text-center mb-3">Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {!isValidName && name && (
              <small className="text-danger">Name cannot be empty or only spaces.</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailExists && <small className="text-danger">Email already exists.</small>}
            {!isValidEmail && email && (
              <small className="text-danger">Please enter a valid email address.</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isValidPassword && password && (
              <small className="text-danger">
                Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.
              </small>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={emailExists || !isValidEmail || !isValidPassword || !isValidName}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
