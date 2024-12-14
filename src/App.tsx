import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageAccueil from './pages/Accueil';
import Authentification from './pages/Authentification';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardMain from './pages/dashboard/DashboardMain';
import PasswordMain from './pages/password/PasswordMain';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <PageAccueil /> } />
                <Route path="/login" element={ <Authentification /> } />
                <Route path="/dashboard" element={ <DashboardLayout /> }>
                    <Route index element={ <DashboardMain /> } />
                    <Route path="password" element={ <PasswordMain /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}