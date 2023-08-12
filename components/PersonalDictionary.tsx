import React, { useState, useEffect } from "react";
import TranslatedResponseTable from "../components/TranslatedResponseTable";
import { fetchUserDictionary } from "../data/userDictionary";
import { ResponseData } from "../src/types";
import { auth } from "../src/firebaseSetup";

export const PersonalDictionary: React.FC = () => {
  const [userDictionary, setUserDictionary] = useState<ResponseData[] | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setUserDictionary(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetchUserDictionary(userId).then((data) => {
        setUserDictionary(data);
        setIsLoading(false);
      });
    }
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>; // Replace with loading spinner or component
  }

  return (
    <>
      <h1>Personal Dictionary</h1>
      {userDictionary && userDictionary.length > 0 ? (
        <TranslatedResponseTable response={{ data: userDictionary }} />
      ) : (
        <p>Your personal dictionary is empty.</p>
      )}
    </>
  );
};
