import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Businesses from "./pages/Businesses";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import Locations from "./pages/Locations";
import AdminUsers from "./pages/AdminUsers";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/users" element={<Users />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
