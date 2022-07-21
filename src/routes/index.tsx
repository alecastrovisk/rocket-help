import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { SignIn } from '../screens/SignIn';
import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import { Loading } from '../components/loading';


export function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber =  auth()
    .onAuthStateChanged(response => {
      setUser(response);
      setIsLoading(false);
    });
    console.log('user: ',user);

    // subscriber();
  },[user]);

  if(isLoading) {
    return <Loading />
  }
  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
