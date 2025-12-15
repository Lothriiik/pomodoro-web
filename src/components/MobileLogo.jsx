import { Link } from "react-router-dom";

export default function DesktopLogo() {
  return (
    <Link to="/" className="flex items-center gap-1">
      <img
        src="/logo.png"
        alt="Ampulheta"
        width={120}
        height={30}
      />
    </Link>
  );
}
