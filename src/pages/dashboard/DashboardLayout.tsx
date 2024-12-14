import { Outlet, useLocation } from "react-router-dom";

import "./DashboardLayout.scss"
import SideNav from "../../ui/SideNav";
import DashboardContenu from "./DashboardContenu";

export default function DashboardLayout() {
    const pages: Record<string, string> = {
        "/dashboard/password": "sidenav.pages.entete.password",
        "/dashboard": "sidenav.pages.entete.dashboard",
    };

    const useCurrentPage = (): string => {
        const cheminPresent = useLocation().pathname;
    
        const pagesTrouvee = Object.keys(pages).find((page) => new RegExp(`^${page}`).test(cheminPresent));
        
        return pagesTrouvee ? pages[pagesTrouvee] : pages["/dashboard"];
    };

    const pagesCourent = useCurrentPage();

    return (
        <>
            <SideNav titre={pagesCourent} />
            <DashboardContenu>
                <Outlet />
            </DashboardContenu>
        </>
    )
}