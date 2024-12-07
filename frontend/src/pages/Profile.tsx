import { useAuthStore } from "../store/useAuthStore";
import defaultProfilePic from "../assets/avatar.png";
import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";
const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState("");  
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      if(typeof base64Image === 'string'){
      setSelectedImage(base64Image);
      await updateProfile({profilePic: base64Image})
      }
      else {
        console.error("Unexpected reader result type: ", base64Image)
      }
    }
  };
  return (
    <div>
      <div className="h-[100%] pt-20">
        <div className="max-w-2l mx-auto px-4 py-8">
          <div className="bg-base-300 rounded-x; p-6 space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2">Your profile information</p>
            </div>
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImage || authUser?.profilePic || defaultProfilePic}
                  alt="Profile Picture"
                  className="size-32 rounded-full object-cover border-4"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transistion-all duration-200 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera className="size-5 text-base-200" />
                  <input
                    type="file"
                    name="avatar-upload"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-sinc-400">
                {isUpdatingProfile
                  ? "Uploading..."
                  : "Click the camera icon to update your photo"}
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="size-4" />
                  Full Name
                </div>
                <p className="px-4 py-2.5 bg-base-200  rounded-lg border">
                  {authUser?.fullName}
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="size-4" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-base-200  rounded-lg border">
                  {authUser?.email}
                </p>
              </div>
            </div>
            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser ? authUser.createdAt?.split("T")[0] : "Date not available"}</span>

                </div>
                <div className="flex items-center justify-between">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
