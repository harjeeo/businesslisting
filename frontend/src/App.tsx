import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ComingSoon from "./pages/ComingSoon";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/businesses"
          element={<ComingSoon title="Businesses" />}
        />
        <Route path="/users" element={<ComingSoon title="Users" />} />
        <Route
          path="/categories"
          element={<ComingSoon title="Categories" />}
        />
        <Route path="/locations" element={<ComingSoon title="Locations" />} />
        <Route
          path="/admin-users"
          element={<ComingSoon title="Admin Users" />}
        />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
      </Route>
    </Routes>
  );
}

export default App;
