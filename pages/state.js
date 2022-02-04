import { createContext, useContext, useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import { signIn, signOut, useSession } from 'next-auth/client';
import axios from 'axios';

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [session, loadingSession] = useSession();
  const [user, setuser] = useState({ data: [{ id: null, default_language: null }] });

  let sharedState = {};

  useEffect(() => {
    if (!session) {
      return;
    }
    axios
      .get('/api/usersAPI/getUser', {
        params: {
          email: session.user.email,
        },
      })
      .then((data) => {
        // console.log('data:', data)
        setuser(data);
      })
      .catch((err) => console.log(err));
  }, [session]);


  return <AppContext.Provider value={user}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
