import { FormattedMessage } from "react-intl";
import { unsetJWT } from "../lib/Authentification";
import "./BoutonCompte.scss";

export default function BoutonCompte() {
    const disconnect = async () => {
        unsetJWT();
        window.location.replace("/login");
    }

    return (
        <button className="bouton-compte" onClick={disconnect}>
            <img src="/svg/PowerIcon.svg" alt="Deconnexion" width={24} height={24} />
            <FormattedMessage id="bouton.compte.text" />
        </button>
    );
}