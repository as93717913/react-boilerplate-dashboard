import Dashboard from '../../Dashboard/Dashboard';
import UserProfile from '../../UserProfile/UserProfile';
import TableList from '../../TableList/TableList';
import Typography from '../../Typography/Typography';
import Icons from '../../Icons/Icons';
import Maps from '../../Maps/Maps';
import Notifications from '../../Notifications/Notifications';
import Upgrade from '../../Upgrade/Upgrade';
import FileUpload from '../../Fileupload'
const appRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "pe-7s-graph",
        component: Dashboard
    }, {
        path: "/user",
        name: "User Profile",
        icon: "pe-7s-user",
        component: UserProfile
    }, {
        path: "/table",
        name: "Table List",
        icon: "pe-7s-note2",
        component: TableList
    }, {
        path: "/typography",
        name: "Typography",
        icon: "pe-7s-news-paper",
        component: Typography
    }, {
        path: "/icons",
        name: "Icons",
        icon: "pe-7s-science",
        component: Icons
    }, {
        path: "/maps",
        name: "Maps",
        icon: "pe-7s-map-marker",
        component: Maps
    }, {
        path: "/notifications",
        name: "Notifications",
        icon: "pe-7s-bell",
        component: Notifications
    }, {
        upgrade: true,
        path: "/upgrade",
        name: "Upgrade to PRO",
        icon: "pe-7s-rocket",
        component: Upgrade
    }, {
        path: "/fileUpload",
        name: "FileUpload",
        icon: "pe-7s-graph",
        component: FileUpload
    }, {
        redirect: true,
        path: "/",
        to: "/dashboard",
        name: "Dashboard"
    }
];

export default appRoutes;
