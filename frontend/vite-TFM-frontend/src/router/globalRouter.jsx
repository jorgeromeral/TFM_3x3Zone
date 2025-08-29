import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFound } from '../views/notFound';
import { Login } from '../views/login';
import { Signin } from '../views/signin';
import { Clubs } from '../views/clubs';
import { ClubDetails } from '../views/clubDetails';
import { Matches } from '../views/matches';
import { Profile } from '../views/profile';
import { ChangePass } from '../views/changePass';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

const GlobalRouter = () => { 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/clubs" element={<Layout><Clubs /></Layout>} />
                <Route path="/clubdetails/:id" element={<Layout><ClubDetails /></Layout>} />
                <Route path="/matches" element={<Layout><Matches /></Layout>} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                <Route path="/changePass" element={<Layout><ChangePass /></Layout>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
};

const Layout = ({ children }) => { // header y footer igual en todas las vistas
    return (
    <>
        <Header />
        {children}
        <Footer />
    </>
    );
}

export default GlobalRouter;

