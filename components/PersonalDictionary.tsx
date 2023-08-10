import React, { useState, useEffect } from "react";
import TranslatedResponseTable from "../components/TranslatedResponseTable";
import { fetchUserDictionary } from "../data/userDictionary";
import { ResponseData } from "../src/types";
import { auth } from "../src/firebaseSetup";

export const PersonalDictionary: React.FC = () => {
  const userId = auth.currentUser?.uid;
  const [userDictionary, setUserDictionary] = useState<ResponseData[] | null>(
    null
  );
  useEffect(() => {
    if (userId) {
      fetchUserDictionary(userId).then((data) => {
        setUserDictionary(data);
      });
    }
  }, [userId]);
  return (
    <>
      {userDictionary && (
        <TranslatedResponseTable response={{ data: userDictionary }} />
      )}
    </>
  );
};
