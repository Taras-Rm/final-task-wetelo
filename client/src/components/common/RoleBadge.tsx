import { RoleT } from "../../types/type";

interface RoleBadgeProps {
  role: RoleT;
}
function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span
      className={`badge ${role === "admin" ? "badge-accent" : "badge-primary"}`}
    >
      {role}
    </span>
  );
}

export default RoleBadge;
