import { RootState } from "@/app/_store/store";
import { useSelector } from "react-redux";
import { UserProfileStandard } from "./standard";
import { useState } from "react";
import { UserProfileForm } from "./form";

export const UserProfile = () => {
  const userProfile = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  return isEditing ? (
    <UserProfileForm
      userId={userProfile.userId}
      displayName={userProfile.displayName}
      photoUrl={userProfile.photoUrl}
      onCancel={toggleEdit}
    />
  ) : (
    <UserProfileStandard
      displayName={userProfile.displayName}
      photoUrl={userProfile.photoUrl}
      onEdit={toggleEdit}
    />
  );
};
