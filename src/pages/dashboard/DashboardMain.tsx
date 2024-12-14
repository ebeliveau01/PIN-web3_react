import { useContext } from "react";
import "./DashboardMain.scss"
import { IChoixLangage, LangageContext } from "../../lib/LangageContext";
import Francais from '../../lang/fr.json';
import Anglais from '../../lang/en.json';
import { FormattedMessage } from "react-intl";

export default function DashboardMain() {
    const { langageInterface, setLangageInterface, setMessages } = useContext(LangageContext);


    return (
        <div className="dashboard-main-contenu">
            <div className="dashboard-main-body">
                <h1><FormattedMessage id="langue.interface.h1" /></h1>
                <div className="profile-card">
                    <label>
                        <select value={langageInterface} onChange={(e) => { setLangageInterface(e.target.value as IChoixLangage); setMessages(e.target.value as IChoixLangage == "fr"? Francais: Anglais); localStorage.setItem('language', e.target.value as IChoixLangage);}}>
                            <option value={"fr"}><FormattedMessage id="langue.interface.choix1" /></option>
                            <option value={"en"}><FormattedMessage id="langue.interface.choix2" /></option>
                        </select>
                    </label>
                </div>
            </div>
        </div>
    )
}