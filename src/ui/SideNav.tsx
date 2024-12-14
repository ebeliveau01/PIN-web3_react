import { useHref, useLocation } from 'react-router-dom';

import BoutonCompte from "./BoutonCompte";
import NavLink from "./NavLink";
import "./SideNav.scss";
import { FormattedMessage } from 'react-intl';

interface ISideNavProps {
    titre: string;
}

export default function SideNav(props: ISideNavProps) {
    const location = useLocation();

    return (
        <div className="sidenav">
            <a className="sidenav_link" href="/dashboard">
                <div className="logo">
                    {/* <AcmeLogo /> */}
                </div>
            </a>
            <div className="menu">
                <div className="nav-item">
                    <div className="links-container">
                        <div className="border-section" />
                        <p className="text-link"><FormattedMessage id={props.titre} /></p>
                        <div className="border-section" />
                    </div>

                    <NavLink nom="navlink1.nom" href="/dashboard" icon="HomeIcon.svg" actif={location.pathname=="/dashboard"} />
                    <NavLink nom="navlink2.nom" href="/dashboard/password" icon="KeyIcon.svg" actif={location.pathname.indexOf("/dashboard/password")!=-1}/>
                </div>
                <BoutonCompte />
            </div>
        </div>
    );
}