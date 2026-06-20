import { PERMISSIONS } from "../config/permissions";

export const getRole = () =>
  localStorage.getItem("role")?.toLowerCase().trim();

export const canPerform = (module, action) => {
  const role = getRole();
  if (!role) return false;

  return (
    PERMISSIONS[role] &&
    PERMISSIONS[role].actions &&
    PERMISSIONS[role].actions[module] &&
    PERMISSIONS[role].actions[module].includes(action)
  );
};
