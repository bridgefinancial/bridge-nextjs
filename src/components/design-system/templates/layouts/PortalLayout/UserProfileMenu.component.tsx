import TextButton from '@/components/design-system/atoms/buttons/TextButton/TextButton.component'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';

interface UserProps {
    firstName: string;
    lastName: string;
    email: string;
}

interface UserProfileMenuProps {
    userInfo: UserProps;
    logout: () =>void
}

const UserProfileMenu = () => {
  return (
    <div>
        <TextButton
            startIcon={<LogoutIcon />}
            text={"logout"}
        />

    </div>
  )
}

export default  UserProfileMenu