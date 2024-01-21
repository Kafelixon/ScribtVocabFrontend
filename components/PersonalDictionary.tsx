import React, { useState, useEffect } from "react";
import TranslatedResponseTable from "../components/TranslatedResponseTable";
import {
  fetchUserDictionary,
  removeFromUserDictionary,
} from "../data/userDictionary";
import { ResponseData } from "../src/types";
import { auth } from "../src/firebaseSetup";
import { Button, Stack } from "@mui/joy";
import StyledCard from "../components/StyledCard";

export const PersonalDictionary: React.FC = () => {
  const [userDictionary, setUserDictionary] = useState<ResponseData[] | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);

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

  const removeSelected = async () => {
    if (!userId) {
      console.error("User ID is missing.");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete these records? This cannot be undone."
    );
    if (confirmDelete) {
      try {
        await removeFromUserDictionary(userId, selectedRecords);
        setUserDictionary((prev) =>
          prev
            ? prev.filter(
                (record) => !selectedRecords.includes(record.original_text)
              )
            : null
        );

        setSelectedRecords([]);
      } catch (error) {
        console.error("Error removing selected records:", error);
      }
    }
  };

  const handleSelectRecord = (recordId: string) => {
    setSelectedRecords((prev) => {
      if (prev.includes(recordId)) {
        return prev.filter((id) => id !== recordId);
      } else {
        return [...prev, recordId];
      }
    });
  };

  const handleSelectAllRecords = () => {
    setSelectedRecords((prev) => {
      if (userDictionary && prev.length !== userDictionary.length) {
        return userDictionary.map((record) => record.original_text);
      } else {
        return [];
      }
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4, pt: 7 }}
      marginX={{ xs: 10, sm: 20, md: 50, pt: 100 }}
      justifyContent="center"
      alignItems="center"
      mt={6}
    >
      <StyledCard>
        {userDictionary && userDictionary.length > 0 ? (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={"-webkit-fill-available"}
              px={2}
            >
              <h1 style={{ alignSelf: "start" }}>Personal Dictionary</h1>
              <Stack direction="row" gap={1}>
                <Button
                  onClick={removeSelected}
                  disabled={selectedRecords.length === 0}
                >
                  Remove
                </Button>
              </Stack>
            </Stack>
            <TranslatedResponseTable
              response={{ data: userDictionary }}
              selectedRecords={selectedRecords}
              onSelectRecord={handleSelectRecord}
              onSelectAllRecords={handleSelectAllRecords}
            />
          </>
        ) : (
          <p>Your personal dictionary is empty.</p>
        )}
      </StyledCard>
    </Stack>
  );
};
