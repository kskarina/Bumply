import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';

import css from './ProfilePage.module.css';

const ProfilePage = () => {
  return (
    <div className={css.profile}>
      <ProfileAvatar />
      <ProfileEditForm />
    </div>
  );
};

export default ProfilePage;
