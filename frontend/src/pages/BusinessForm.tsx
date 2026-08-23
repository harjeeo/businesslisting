import { useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft01Icon } from "hugeicons-react";
import { TextField, TextareaField, SelectField } from "../components/ui/FormField";
import { SingleImageUpload, GalleryUpload } from "../components/ui/ImageUpload";
import { VideoField } from "../components/ui/VideoField";
import MapPicker from "../components/ui/MapPicker";
import { useAdminData } from "../context/AdminDataContext";
import type { Business } from "../data/dummy";

function FormSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

const businessTypes = ["Manufacturer", "Supplier", "Retailer", "Service Provider", "Professional"];
const employeeRanges = ["1-10", "11-50", "51-200", "200+"];

export default function BusinessForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { businesses, addBusiness, updateBusiness } = useAdminData();
  const existing = id ? businesses.find((b) => b.id === Number(id)) : undefined;
  const isEdit = Boolean(existing);

  const [name, setName] = useState(existing?.name ?? "");
  const [businessType, setBusinessType] = useState(existing?.businessType ?? businessTypes[0]);
  const [category, setCategory] = useState(existing?.category ?? "");
  const [subCategory, setSubCategory] = useState(existing?.subCategory ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [establishedYear, setEstablishedYear] = useState(existing?.establishedYear ?? "");
  const [employees, setEmployees] = useState(existing?.employees ?? employeeRanges[0]);

  const [country, setCountry] = useState<Business["country"]>(existing?.country ?? "India");
  const [state, setState] = useState(existing?.state ?? "");
  const [city, setCity] = useState(existing?.city ?? "");
  const [address, setAddress] = useState(existing?.address ?? "");
  const [postalCode, setPostalCode] = useState(existing?.postalCode ?? "");
  const [lat, setLat] = useState(existing?.lat ?? 28.6139);
  const [lng, setLng] = useState(existing?.lng ?? 77.209);

  const [phone, setPhone] = useState(existing?.phone ?? "");
  const [whatsapp, setWhatsapp] = useState(existing?.whatsapp ?? "");
  const [email, setEmail] = useState(existing?.email ?? "");
  const [website, setWebsite] = useState(existing?.website ?? "");

  const [logoUrl, setLogoUrl] = useState(existing?.logoUrl ?? "");
  const [coverUrl, setCoverUrl] = useState(existing?.coverUrl ?? "");
  const [galleryUrls, setGalleryUrls] = useState<string[]>(existing?.galleryUrls ?? []);
  const [videoUrl, setVideoUrl] = useState(existing?.videoUrl ?? "");

  const [status, setStatus] = useState<Business["status"]>(existing?.status ?? "Pending");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const data = {
      name,
      businessType,
      category,
      subCategory,
      description,
      establishedYear,
      employees,
      country,
      state,
      city,
      address,
      postalCode,
      lat,
      lng,
      phone,
      whatsapp,
      email,
      website,
      logoUrl,
      coverUrl,
      galleryUrls,
      videoUrl,
      status,
    };
    setError("");
    setSubmitting(true);
    try {
      if (existing) await updateBusiness(existing.id, data);
      else await addBusiness(data);
      navigate("/businesses");
    } catch {
      setError("Could not save business. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft01Icon size={18} />
        Back
      </button>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEdit ? "Edit Business" : "Add Business"}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {isEdit ? "Update this business's full profile" : "Create a complete business profile"}
        </p>
      </div>

      <div className="space-y-4">
        <FormSection title="Basic Information" description="Core details about the business">
          <TextField label="Business Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sharma Electronics" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Business Type" options={businessTypes} value={businessType} onChange={(e) => setBusinessType(e.target.value)} />
            <SelectField label="Number of Employees" options={employeeRanges} value={employees} onChange={(e) => setEmployees(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Electronics" />
            <TextField label="Sub-category" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} placeholder="e.g. Mobile Phones" />
          </div>
          <TextareaField label="Business Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does this business do?" />
          <TextField label="Established Year" value={establishedYear} onChange={(e) => setEstablishedYear(e.target.value)} placeholder="e.g. 2015" />
        </FormSection>

        <FormSection title="Location" description="Address and map location">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SelectField label="Country" options={["India", "Canada"]} value={country} onChange={(e) => setCountry(e.target.value as Business["country"])} />
            <TextField label="State / Province" value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Punjab" />
            <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Ludhiana" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street address" />
            </div>
            <TextField label="Postal / PIN Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="e.g. 141002" />
          </div>
          <MapPicker lat={lat} lng={lng} onChange={(newLat, newLng) => { setLat(newLat); setLng(newLng); }} />
        </FormSection>

        <FormSection title="Contact Details" description="How customers can reach this business">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
            <TextField label="WhatsApp Number" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+91 98765 43210" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@business.com" />
            <TextField label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://business.com" />
          </div>
        </FormSection>

        <FormSection title="Media" description="Logo, cover image, gallery photos and a video">
          <SingleImageUpload
            label="Cover Image"
            value={coverUrl}
            onChange={setCoverUrl}
            aspect="aspect-[3/1]"
            size="w-full"
          />
          <SingleImageUpload
            label="Logo"
            value={logoUrl}
            onChange={setLogoUrl}
            aspect="aspect-square"
            size="w-32"
          />
          <GalleryUpload label="Gallery Images" values={galleryUrls} onChange={setGalleryUrls} />
          <VideoField label="Business Video" value={videoUrl} onChange={setVideoUrl} />
        </FormSection>

        <FormSection title="Status" description="Verification status shown to customers">
          <SelectField label="Status" options={["Pending", "Verified", "Suspended"]} value={status} onChange={(e) => setStatus(e.target.value as Business["status"])} />
        </FormSection>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
          >
            {submitting ? "Saving…" : isEdit ? "Save Changes" : "Add Business"}
          </button>
        </div>
      </div>
    </div>
  );
}
