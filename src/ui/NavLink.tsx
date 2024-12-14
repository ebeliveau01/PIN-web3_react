import { FormattedMessage } from "react-intl";
import "./NavLink.scss"

interface INavLink {
    nom: string;
    icon: string;
    href: string;
    actif: boolean;
}

export default function NavLink(props: INavLink) {    
    return (
        <div className={`nav-link ${props.actif ? 'actif' : ''}`}>
            <a className="navlink-a" href={props.href}>
                <div className="icon-container">
                    {props.icon && <img src={"/svg/"+props.icon} alt={props.nom} width={32} height={32} />}
                </div>
                <p>●</p>
                <p className="link-text"><FormattedMessage id={props.nom} /></p>
            </a>
        </div>
    );
}