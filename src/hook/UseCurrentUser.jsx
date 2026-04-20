export function useCurrentUser() {
  const id   = localStorage.getItem("userId");
  const name = localStorage.getItem("userName");
  const EmailOrParty = localStorage.getItem("userEmailOrParty");
  const HasVotedOrVotes = localStorage.getItem("userHasVotedOrVotes");
  const isAuth = localStorage.getItem("isAuth") === "true";

  const logout = () => {
    localStorage.clear();
  };

  return { id, name, EmailOrParty, HasVotedOrVotes, isAuth, logout };
}