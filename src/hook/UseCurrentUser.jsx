import { useState, useEffect } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState({
    id: localStorage.getItem("userId"),
    name: localStorage.getItem("userName"),
    EmailOrParty: localStorage.getItem("userEmailOrParty"),
    HasVotedOrVotes: localStorage.getItem("userHasVotedOrVotes"),
    isAuth: localStorage.getItem("isAuth") === "true",
  });

  useEffect(() => {
    const syncUser = () => {
      setUser({
        id: localStorage.getItem("userId"),
        name: localStorage.getItem("userName"),
        EmailOrParty: localStorage.getItem("userEmailOrParty"),
        HasVotedOrVotes: localStorage.getItem("userHasVotedOrVotes"),
        isAuth: localStorage.getItem("isAuth") === "true",
      });
    };

    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  return { ...user };
}