import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Loader from "./common/Loader/Loader"
import PageTitle from './components/PageTitle';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import ContactMessages from './pages/Dashboard/ContactMessages';
import ECommerce from './pages/Dashboard/ECommerce';
import AddProperties from './pages/Properties/AddProperties';
import '../public/Styles/Global.css'
import UpdateContent from './pages/UpdateContent/UpdateContent';
import UpdateLocation from './pages/UpdateContent/UpdateLocation/UpdateLocation';
import UpdateAboutUsPage from './pages/UpdateContent/UpdateAboutUsPage/UpdateAboutUsPage';
import UpdateHeroSection from './pages/UpdateContent/UpdateHeroSectionCarousel/UpdateHeroSection';
import SignIn from './Authentication/SignIn';
// import SignUp from './Authentication/SignUp';
import AddEmployees from './pages/UpdateContent/AddEmployees';
import Logout from './Authentication/Logout';
import PropertiesDetails from './pages/Properties/PropertiesDetails';
import PropertyCardComp from './components/PropertyCardComp';
import Notifications from './pages/UpdateContent/NotificationsPage/Notifications';
import QRCodeGenerator from './components/QRCodeGenerator';
import ResetPassword from './Authentication/ResetPassword';
import SetNewPassword from './Authentication/setNewPassword';
import axios from 'axios';
import { AuthProvider, useAuth } from './context/AuthContext';

// Set default base URL for all axios requests
// axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:7777';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userType, setUserType] = useState<string>('admin'); // 'admin' or 'employee'
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [PDFIsOpen, setPDFIsOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  const Property = {
    id: 1,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    name: 'Hill Heights',
    location: 'South Delhi',
    Price: 1000000,
    area: 1500,
    bedrooms: 3,
    bathrooms: 2,
    Garage: '1 Car',
  };

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
      // Redirect them to the /signin page, but save the current location they were
      // trying to go to when they were redirected.
      return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  if (loading) return <Loader />;

  return (
    <AuthProvider>
      {['/signIn', '/forgotpass', '/', '/propertiesdetails', '/set-new-password'].includes(pathname) ? (
        <Routes>
          <Route index path='/' element={<> <PageTitle title="Sign In | Anmol Real Estate" /><SignIn userType={userType} setUserType={setUserType} /> </>} />
          <Route path='/signIn' element={<> <PageTitle title="Sign In | Anmol Real Estate" /><SignIn userType={userType} setUserType={setUserType} /> </>} />
          <Route path='/resetpassword' element={<> <PageTitle title="Reset Password | Anmol Real Estate" /><ResetPassword /> </>} />
          <Route path='/propertiesdetails' element={<><PageTitle title="Property Details | Anmol Real Estate" /><PropertiesDetails PDFIsOpen={PDFIsOpen} setPDFIsOpen={setPDFIsOpen} property={Property} /></>} />
          <Route path='/set-new-password' element={<><PageTitle title="Set New Password | Anmol Real Estate" /><SetNewPassword /></>} />
        </Routes>
      ) : (
        <DefaultLayout userType={userType} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <Routes>
            {/* Routes accessible by both admin and employee */}
            <Route path='/dashboard' element={
              <ProtectedRoute allowedRoles={['admin', 'employee']}>
                <> <PageTitle title="Dashboard | Anmol Real Estate" /><ECommerce /> </>
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute allowedRoles={['admin', 'employee']}>
                <> <PageTitle title="Calendar | Anmol Real Estate" /><Calendar /> </>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['admin', 'employee']}>
                <> <PageTitle title="Profile | Anmol Real Estate" /><Profile /> </>
              </ProtectedRoute>
            } />
            <Route path="/updatecontent" element={
              <ProtectedRoute allowedRoles={['admin', 'employee']}>
                <> <PageTitle title="Update Content | Anmol Real Estate" /> <UpdateContent /> </>
              </ProtectedRoute>
            } />
            <Route path="/properties" element={
              <ProtectedRoute allowedRoles={['admin', 'employee']}>
                <> <PageTitle title="Add Properties | Anmol Real Estate" /><AddProperties /> </>
              </ProtectedRoute>
            } />
            <Route path="/resetpassword" element={
              <ProtectedRoute allowedRoles={['admin', 'employee']}>
                <> <PageTitle title="Reset Password | Anmol Real Estate" /><ResetPassword /> </>
              </ProtectedRoute>
            } />
            {/* <Route path='/set-new-password' element={<SetNewPassword />} /> */}

            {/* <Route path="/propertiesdetails" element={
            <ProtectedRoute allowedRoles={['admin', 'employee']}>
              <> <PageTitle title="Properties Details | Anmol Real Estate" /> <PropertiesDetails PDFIsOpen={PDFIsOpen} setPDFIsOpen={setPDFIsOpen} property={Property} /> </>
            </ProtectedRoute>
          } /> */}


            {/*Routes accessible only by employer  */}
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={['employee']}>
                <> <PageTitle title="Settings | Anmol Real Estate" /> <Settings /> </>
              </ProtectedRoute>
            } />



            {/* Routes accessible only by admin */}
            <Route path="/updatelocation" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <> <PageTitle title="Update Location | Anmol Real Estate" /> <UpdateLocation /> </>
              </ProtectedRoute>
            } />
            <Route path="/updateaboutuspage" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <> <PageTitle title="Update Location | Anmol Real Estate" /> <UpdateAboutUsPage /> </>
              </ProtectedRoute>
            } />
            <Route path="/updateherosectioncarousel" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <> <PageTitle title="Update Location | Anmol Real Estate" /> <UpdateHeroSection /> </>
              </ProtectedRoute>
            } />
            <Route path='/contactpage' element={
              <ProtectedRoute allowedRoles={['admin']}>
                <> <PageTitle title="Contact Page | Anmol Real Estate" /><ContactMessages /> </>
              </ProtectedRoute>
            } />
            <Route path='/addemployees' element={
              <ProtectedRoute allowedRoles={['admin']}>
                <> <PageTitle title="Add Employees | Anmol Real Estate" /><AddEmployees /> </>
              </ProtectedRoute>
            } />
            <Route path='/notifications' element={
              <ProtectedRoute allowedRoles={['admin']}>
                <><PageTitle title='Notifications | Anmol Real Estate' /><Notifications />
                </>
              </ProtectedRoute>
            } />



          </Routes>
        </DefaultLayout>
      )}

      {isModalOpen && <Logout isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </AuthProvider>
  );
}

export default App;