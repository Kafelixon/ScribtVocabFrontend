import React, { useState } from "react";
import { auth } from "../src/firebaseSetup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  sendEmailVerification,
} from "firebase/auth";
import { login } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserPreferences } from "../data/userPreferences";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Card, Input, Typography } from "@mui/joy";
import { Google } from "@mui/icons-material";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(true);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);
  const uid = userState.user ? userState.user.uid : null;
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let userCredential;
      if (registered) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        if (password.length < 6) {
          throw new Error("Password must be atleast 6 characters");
        }
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(userCredential.user).catch((err) =>
          console.log(err)
        );
      }
      dispatchLogin(userCredential);
      setUserPreferences(uid, {
        theme: "dark",
      });
    } catch (error: any) {
      handleLoginError(error);
    }
  };

  const handleLoginError = (error: any) => {
    if (error.code === "auth/email-already-in-use") {
      setError("email", { message: error.message });
    } else if (error.code === "auth/invalid-email") {
      setError("email", { message: error.message });
    } else if (error.code === "auth/wrong-password") {
      setError("password", { message: error.message });
    }
  };

  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      dispatchLogin(result);
    } catch (error: any) {
      handleLoginError(error);
    }
  };

  const dispatchLogin = (credential: UserCredential) => {
    const { uid, email } = credential.user;
    dispatch(login({ uid, email }));
    navigate(from, { replace: true });
  };

  return (
    <Card variant="outlined" sx={{ boxShadow: 2, py: 3 }}>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">{registered ? "Sign in" : "Sign up"}</Button>

        <Button
          onClick={handleGoogleLogin}
          variant="outlined"
          sx={{
            color: "var(--bs-palette-primary-600)",
            ":hover": {
              color: "var(--bs-palette-primary-700)",
              backgroundColor: "var(--bs-palette-primary-100)",
            },
          }}
        >
          <Google sx={{ pr: 1, maxHeight: "1.4rem" }} />
          Sign in with Google
        </Button>
      </form>

      <Typography
        level="body-xs"
        sx={{
          textAlign: "center",
          mb: -1,
          color: "var(--bs-palette-text-primary)",
        }}
      >
        {registered ? "Don't have an account? " : "Already have an account? "}
        <a
          onClick={() => setRegistered(!registered)}
          style={{ cursor: "pointer", color: "var(--bs-palette-primary-600)" }}
        >
          {registered ? "Sign up" : "Sign in"}
        </a>
      </Typography>
    </Card>
  );
};

export default SignInForm;

function setError(arg0: string, arg1: { message: any }) {
  console.log(arg0, arg1);
  throw new Error("Function not implemented.");
}
