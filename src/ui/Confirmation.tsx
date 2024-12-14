import { FormattedMessage } from "react-intl";
import { IMotDePasseConfirmation } from "../lib/types";
import "./Confirmation.scss"

export default function Confirmation(props: IMotDePasseConfirmation) {
    console.log(props);
    
    return (
        <div className="confirmation-body">
            <h2><FormattedMessage id={props.titre} /></h2>
            <p>{props.description}</p>
            <div className="options-confirmation">
                <button onClick={props.bouton1OnClick}><FormattedMessage id={props.textBouton1? props.textBouton1: "confirmation.textbouton1.base"} /></button>
                <button onClick={props.bouton2OnClick}><FormattedMessage id={props.textBouton2? props.textBouton2: "confirmation.textbouton2.base"} /></button>
            </div>
        </div>
    );
}