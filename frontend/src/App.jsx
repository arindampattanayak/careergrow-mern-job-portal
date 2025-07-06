import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import EditJob from './components/admin/EditJob'
import ShowJob from './components/admin/ShowJob'
import CompanyJobs from './components/admin/CompanyJobs'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import UploadResume from './components/UploadResume.jsx'
import MatchedJobs from './components/MatchedJobs.jsx';
import ChatBox from "./components/ChatBox.jsx";
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
  path: '/forgot-password',
  element: <ForgotPassword />
},
{
  path: '/reset-password/:token',
  element: <ResetPassword />
},
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/resume/upload",
    element: <UploadResume />
  },
  {
    path: "/matched-jobs",
    element: <MatchedJobs />
  },
  {
    path: "/chat/:jobId/:recruiterId/:applicantId",
    element: <ChatBox />
  },
  {
    path: "/profile",
    element: <Profile />
  },
 
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
   {
    path: "/admin/jobs/:id/edit",
    element: <ProtectedRoute><EditJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/show" ,
    element: <ProtectedRoute><ShowJob /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:companyId/jobs" ,
    element: <ProtectedRoute><CompanyJobs/></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
