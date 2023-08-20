import React, { useState, useEffect } from "react";
import TranslatedResponseTable from "../components/TranslatedResponseTable"; // You will need to modify this component to support edit mode.
import { fetchUserDictionary, removeFromUserDictionary } from "../data/userDictionary";
import { ResponseData } from "../src/types";
import { auth } from "../src/firebaseSetup";
import { Button, Stack } from "@mui/joy";

export const PersonalDictionary: React.FC = () => {
  const [userDictionary, setUserDictionary] = useState<ResponseData[] | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]); // Assuming records have unique IDs.

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

  const areAllSelected = userDictionary
    ? selectedRecords.length === userDictionary.length
    : false;

  const toggleSelectAll = () => {
    if (areAllSelected) {
      setSelectedRecords([]); // Deselect all
    } else {
      if (userDictionary) {
        setSelectedRecords(
          userDictionary.map((record) => record.original_text)
        );
      }
    }
  };

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
          setIsEditMode(false);
        } catch (error) {
          console.error("Error removing selected records:", error);
        }
    }
};


  const cancelEditMode = () => {
    setSelectedRecords([]);
    setIsEditMode(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Personal Dictionary</h1>

      {userDictionary && userDictionary.length > 0 ? (
        <>
          {isEditMode ? (
            <Stack direction={"row"} gap={1}>
              <Button onClick={toggleSelectAll}>
                {areAllSelected ? "Deselect All" : "Select All"}
              </Button>
              <Button onClick={removeSelected}>Remove</Button>
              <Button onClick={cancelEditMode}>Cancel</Button>
            </Stack>
          ) : (
            <Button onClick={() => setIsEditMode(true)}>Edit</Button>
          )}
          <TranslatedResponseTable
            response={{ data: userDictionary }}
            isEditMode={isEditMode}
            selectedRecords={selectedRecords}
            onSelectRecord={(recordId) => {
              setSelectedRecords((prev) => {
                if (prev.includes(recordId)) {
                  return prev.filter((id) => id !== recordId);
                } else {
                  return [...prev, recordId];
                }
              });
            }}
          />
        </>
      ) : (
        <p>Your personal dictionary is empty.</p>
      )}
    </>
  );
};
