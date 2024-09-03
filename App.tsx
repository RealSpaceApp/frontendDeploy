import MainNavigator from './src/Navigation';
import { UserProvider } from './src/config/Context/UserContext';

export default function App() {
  return (
    <UserProvider>
    <MainNavigator />
    </UserProvider>
  );
}
