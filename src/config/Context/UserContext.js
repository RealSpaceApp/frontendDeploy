import React, { createContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../AxiosInstance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    bio: '',
    birthday: '',
    email: '',
    number: '',
    photo: '',
    bg: '',
    theme: 'Blue01',
    events_attended: ''
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/user/profile/`);
      console.debug('User Profile Response:', response.data);

      setUserData({
        name: response.data.name,
        bio: response.data.about,
        birthday: response.data.birthday,
        email: response.data.email,
        number: response.data.phone || '',
        photo: response.data.avatar,
        bg: response.data.bg,
        theme: 'Blue01',
        events_attended: response.events_attended
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
