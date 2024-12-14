import { useContext } from "react";
import "./PasswordCard.scss";
import { MotDePasseChoix, MotDePasseContext } from "../lib/PasswordContext";
import { IMotDePasse, IMotDePasseConfirmation } from "../lib/types";
import { FormattedMessage } from "react-intl";

interface IPasswordCardProps {
    motdepasse: IMotDePasse;
}

export default function PasswordCard(props: IPasswordCardProps) {
    const { choix, modificationEffectuee, setMotDePasseActif, setChoix, setConfirmation} = useContext(MotDePasseContext);
    
    const motdepasse: IMotDePasse = props.motdepasse;

    return (
        <div className="password-card" onClick={() => {
            if (modificationEffectuee && (choix == MotDePasseChoix.MODIFIER || choix == MotDePasseChoix.AJOUTER)) {
                setConfirmation({
                    titre: "confirmation.password.card.titre",
                    description: (<><FormattedMessage id="confirmation.password.card.description" values={{titre: motdepasse.titre}}/></>),
                    bouton1OnClick: () => {
                        setMotDePasseActif(motdepasse);
                        setChoix(MotDePasseChoix.DETAIL);
                        setConfirmation(null);
                    },
                    bouton2OnClick: () => {
                        setConfirmation(null);
                    },
                } as IMotDePasseConfirmation)
            }
            else {
                setMotDePasseActif(motdepasse);
                setChoix(MotDePasseChoix.DETAIL);
            }
        }}>
            <p>{motdepasse.titre}</p>
            <p>{motdepasse.url}</p>
        </div>
    )
}