import type { Metadata } from 'next';

import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';

import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'Профіль - Лелека',
  openGraph: {
    title: 'Профіль - Лелека',
  },
};

const ProfilePage = () => {
  return (
    <div className={css.profile}>
      <ProfileAvatar />
      <ProfileEditForm />
    </div>
  );
};

export default ProfilePage;
