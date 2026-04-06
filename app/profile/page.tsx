"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Shield,
  CheckCircle2,
  Calendar,
  Globe,
  Linkedin,
  Twitter,
  Edit3,
} from "lucide-react";
import { toast } from "sonner";

type Profile = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  dateOfBirth?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  avatar?: string;
};

export default function ProfilePage() {
  const API = process.env.NEXT_PUBLIC_BACKEND_URL

  const [profileData, setProfileData] = useState<Profile>({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    dateOfBirth: "",
    website: "",
    linkedin: "",
    twitter: "",
    avatar: "",
  });

  const [originalData, setOriginalData] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/profile/`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfileData(data);
        setOriginalData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Please try again.");
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API]);

  const handleInputChange = (field: keyof Profile, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`${API}/profile/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profileData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      setProfileData(updated);
      setOriginalData(updated);
      setIsEditing(false);

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      setError("Failed to save changes");
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (originalData) setProfileData(originalData);
    setIsEditing(false);
    setError(null);
  };

  // Mock Avatar Upload (Production: replace with real upload)
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // In real app: upload to S3/Cloudinary then update profile
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData((prev) => ({ ...prev, avatar: reader.result as string }));
        toast.success("Profile photo updated");
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error("Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-lg text-white">Loading profile...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 text-[#E5E7EB] max-w-6xl mx-auto">
        {/* Header - Big Tech Style */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 h-64 border border-[#1E293B]">
          <div className="absolute -bottom-12 left-8 flex items-end gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32 ring-4 ring-[#0F172A] shadow-2xl">
                <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-5xl font-semibold">
                  {profileData.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>

              {isEditing && (
                <label className="absolute bottom-2 right-2 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <div className="bg-blue-600 hover:bg-blue-500 p-2.5 rounded-full shadow-lg">
                    <Camera className="h-5 w-5" />
                  </div>
                </label>
              )}
            </div>

            <div className="mb-4">
              <h1 className="text-4xl font-bold text-white">{profileData.name || "Your Name"}</h1>
              <p className="text-[#94A3B8] mt-1 text-lg">{profileData.bio?.slice(0, 80) || "No bio yet"}</p>
            </div>
          </div>

          <div className="absolute top-6 right-6">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-white text-black hover:bg-gray-200">
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - About & Verification */}
          <div className="lg:col-span-4 space-y-6">
            {/* Verification Status - Big Tech Style */}
            <Card className="bg-[#0F172A] border border-[#1E293B]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-emerald-500" />
                  Identity Verified
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Identity", "Background Check", "License"].map((item) => (
                  <div key={item} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <span>{item}</span>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400">
                      Verified
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="bg-[#0F172A] border border-[#1E293B]">
              <CardHeader>
                <CardTitle>Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-sm">
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-[#94A3B8]">Email</p>
                    <p className="font-medium">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-[#94A3B8]">Phone</p>
                    <p className="font-medium">{profileData.phone || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-[#94A3B8]">Location</p>
                    <p className="font-medium">{profileData.address || "Not provided"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="bg-[#0F172A] border border-[#1E293B]">
              <CardHeader>
                <CardTitle>About You</CardTitle>
                <CardDescription>Share more about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    disabled={!isEditing}
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Email Address</Label>
                    <Input
                      disabled={!isEditing}
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      disabled={!isEditing}
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Address</Label>
                  <Input
                    disabled={!isEditing}
                    value={profileData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    disabled={!isEditing}
                    value={profileData.dateOfBirth || ""}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Bio</Label>
                  <Textarea
                    disabled={!isEditing}
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={4}
                    className="mt-1 resize-y"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <Separator className="bg-[#1E293B]" />

                <div>
                  <Label className="text-base font-medium flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5" /> Social &amp; Website
                  </Label>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Globe className="h-5 w-5 text-gray-400 mt-3" />
                      <Input
                        disabled={!isEditing}
                        value={profileData.website || ""}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Linkedin className="h-5 w-5 text-gray-400 mt-3" />
                      <Input
                        disabled={!isEditing}
                        value={profileData.linkedin || ""}
                        onChange={(e) => handleInputChange("linkedin", e.target.value)}
                        placeholder="linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Twitter className="h-5 w-5 text-gray-400 mt-3" />
                      <Input
                        disabled={!isEditing}
                        value={profileData.twitter || ""}
                        onChange={(e) => handleInputChange("twitter", e.target.value)}
                        placeholder="twitter.com/yourhandle"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}