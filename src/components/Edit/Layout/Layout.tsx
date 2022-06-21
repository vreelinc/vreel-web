import SecureRoute from "@auth/SecureRoute/SecureRoute";
import DesktopDashboard from "./Desktop/DesktopDashboard";
import MobileDashboard from "./Mobile/MobileDashboard";

const Layout: React.FC = () => {
  return (
    <>
      <DesktopDashboard />
      <MobileDashboard />
    </>
  );
};

export default SecureRoute(Layout);
