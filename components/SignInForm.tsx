import React, { useState } from 'react';
import { auth } from '../src/firebaseSetup';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { login, logout } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, Input, Typography } from '@mui/joy';
import { Google } from '@mui/icons-material';


export const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(true);
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();
    const userState = useSelector((state: any) => state.user);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let userCredential;
            if (registered) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            }
            dispatchLogin(userCredential);
        } catch (error: any) {
            console.error(error.code, error.message);
        }
    };

    const handleGoogleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, provider);
            dispatchLogin(result);
        } catch (error: any) {
            console.error(error.code, error.message, error.customData?.email);
        }
    };

    const dispatchLogin = (credential: UserCredential) => {
        const { uid, displayName, email, photoURL } = credential.user;
        dispatch(login({ uid, displayName, email, photoURL }));
    };


    if (userState.user) {
        return <div>
            Hello {' '} {userState.user.email} {' '}
            <Button onClick={() => dispatch(logout())}>Logout</Button>
        </div>;
    }
    return (
        <Card variant="outlined" sx={{ boxShadow: 2, py: 3 }}>

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                <Button type="submit">
                    {registered ? "Sign in" : "Sign up"}
                </Button>

                <Button onClick={handleGoogleLogin} variant='outlined' sx={{
                    color: "var(--bs-palette-primary-600)",
                    ":hover": {
                        color: "var(--bs-palette-primary-700)",
                        backgroundColor: "var(--bs-palette-primary-100)"
                    }
                }}><Google sx={{ pr: 1, maxHeight: "1.4rem" }} />Sign in with Google
                </Button>
            </form>

            <Typography level="body3" sx={{ textAlign: "center", mb: -1, color: "var(--bs-palette-text-primary)" }}>
                {registered ? "Don't have an account? " : "Already have an account? "}
                <a onClick={() => setRegistered(!registered)}
                    style={{ cursor: "pointer", color: "var(--bs-palette-primary-600)" }}
                >
                    {registered ? "Sign up" : "Sign in"}
                </a>
            </Typography>
        </Card>
    );
};

export default SignInForm;
