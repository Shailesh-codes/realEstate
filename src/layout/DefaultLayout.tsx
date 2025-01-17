import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type UserType = 'admin' | 'employee';

interface DefaultLayoutProps {
  children: ReactNode;
  userType: string;
  isModalOpen: boolean;
  setIsModalOpen:(arg: boolean) => void;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, userType, isModalOpen, setIsModalOpen }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar userType={userType} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header userType={userType} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;



// import React, { useState, ReactNode } from 'react';
// import Header from '../components/Header/index';
// import Sidebar from '../components/Sidebar/index';

// const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="">
//           <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//           <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          
//           <main>
//             <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 lg:ml-72.5 mt-20">
//               {children}
//             </div>
//           </main>
          
//     </div>
//   );
// };

// export default DefaultLayout;

