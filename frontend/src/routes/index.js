import DedaultLayout from '~/components/Layout/DefaultLayout';
import DoctorLayout from '~/components/Layout/DoctorLayout';
import AdminLayout from '~/components/Layout/AdminLayout';
import UserLayout from '~/components/Layout/UserLayout';
import SignUp from '~/components/SignUp';
import Login from '~/components/Login';
import Content from '~/components/User/Content';
import DoctorContent from '~/components/Doctor/DoctorContent';
import Exam from '~/components/Doctor/Exam';
import Schedule from '~/components/Doctor/Schedule';
import Hospital from '~/components/User/Hospital';
import Doctor from '~/components/User/Doctor';
import Profile from '~/components/User/Profile';
import SearchResult from '~/components/User/SearchResult';
import HospitalManage from '~/components/Admin/ManageHospital';
import HospitalDoctor from '~/components/Admin/ManageDoctor';
import AddHospital from '~/components/Admin/AddHospital';

const routes = [
    { path: '/', element: Content, layout: DedaultLayout },
    { path: '/home', element: Content, layout: DedaultLayout },
    { path: '/signup', element: SignUp, layout: UserLayout },
    { path: '/login', element: Login, layout: UserLayout },
    { path: '/hospital/:id', element: Hospital, layout: DedaultLayout },
    { path: '/doctor/:id', element: Doctor, layout: DedaultLayout },
    { path: '/d', element: DoctorContent, layout: DoctorLayout },
    { path: '/d/exam', element: Exam, layout: DoctorLayout },
    { path: '/d/schedule', element: Schedule, layout: DoctorLayout },
    { path: '/profile', element: Profile, layout: DoctorLayout },
    { path: '/search', element: SearchResult, layout: DedaultLayout },
    { path: '/admin/hospital/add', element: AddHospital, page: '1', layout: AdminLayout },
    { path: '/admin/hospital', element: HospitalManage, page: '1', layout: AdminLayout },
    { path: '/admin/doctor', element: HospitalDoctor, page: '2', layout: AdminLayout },
    { path: '/admin', element: HospitalManage, layout: AdminLayout },
];

export { routes };
