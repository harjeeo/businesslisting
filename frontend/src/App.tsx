import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Businesses from "./pages/Businesses";
import BusinessForm from "./pages/BusinessForm";
import BusinessDetail from "./pages/BusinessDetail";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Categories from "./pages/Categories";
import CategoryForm from "./pages/CategoryForm";
import CategoryDetail from "./pages/CategoryDetail";
import Locations from "./pages/Locations";
import LocationForm from "./pages/LocationForm";
import LocationDetail from "./pages/LocationDetail";
import AdminUsers from "./pages/AdminUsers";
import AdminUserForm from "./pages/AdminUserForm";
import AdminUserDetail from "./pages/AdminUserDetail";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Leads from "./pages/Leads";
import Rfqs from "./pages/Rfqs";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/businesses" element={<Businesses />} />
        <Route path="/businesses/new" element={<BusinessForm />} />
        <Route path="/businesses/:id" element={<BusinessDetail />} />
        <Route path="/businesses/:id/edit" element={<BusinessForm />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/new" element={<CategoryForm />} />
        <Route path="/categories/:id" element={<CategoryDetail />} />
        <Route path="/categories/:id/edit" element={<CategoryForm />} />

        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/rfqs" element={<Rfqs />} />
        <Route path="/reviews" element={<Reviews />} />

        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/new" element={<LocationForm />} />
        <Route path="/locations/:id" element={<LocationDetail />} />
        <Route path="/locations/:id/edit" element={<LocationForm />} />

        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-users/new" element={<AdminUserForm />} />
        <Route path="/admin-users/:id" element={<AdminUserDetail />} />
        <Route path="/admin-users/:id/edit" element={<AdminUserForm />} />

        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
