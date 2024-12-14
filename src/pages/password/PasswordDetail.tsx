import { useContext } from "react"
import "./PasswordDetail.scss"
import { MotDePasseChoix, MotDePasseContext } from "../../lib/PasswordContext"
import { IMotDePasseConfirmation } from "../../lib/types";
import axios from "axios";
import { URL_BASE } from "../../lib/variable";
import { getJWT } from "../../lib/Authentification";
import { FormattedDate, FormattedMessage } from "react-intl";

export default function PasswordDetail() {
    const { motDePasseActif, motDePasses, setChoix, setConfirmation, setMotDePasses } = useContext(MotDePasseContext);

    let tagString = "";

    if (motDePasseActif != null) {
        motDePasseActif.tags.forEach(tag => {
            tagString += tag+","
        });
    }

    return (
        <>
            {motDePasseActif && <div className="password-detail">
                <div className="password-detail-header">
                    <h1><FormattedMessage id="password.detail.titre" /></h1>
                    <div className="actions">
                        <div className="action">
                            <button type="button" onClick={() => {
                                setChoix(MotDePasseChoix.MODIFIER);
                            }}>
                                <img src="/svg/PencilIcon.svg" alt="Modifier" />
                            </button>
                        </div>
                        <div className="action">
                            <button type="button" onClick={() => {
                                setConfirmation({
                                    titre: "confirmation.titre.passwordDetail.suppression",
                                    description: (<><FormattedMessage id="confirmation.description.passwordDetail.suppression" values={{ titre: motDePasseActif.titre}}/></>),
                                    textBouton1: "confirmation.textBouton1.passwordDetail.suppression",
                                    textBouton2: "confirmation.textBouton2.passwordDetail.suppression",
                                    bouton1OnClick: () => {
                                        axios.delete(URL_BASE+`motdepasse/delete/${motDePasseActif._id}`, {
                                            headers: {
                                                authorization: `${getJWT()}`,
                                            },
                                        })
                                        .then((response) => {
                                            console.log(response);
                                            setMotDePasses(motDePasses.filter((motDePasse) => motDePasse._id !== motDePasseActif?._id));
                                            setChoix(MotDePasseChoix.NONE);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                        setConfirmation(null);
                                    },
                                    bouton2OnClick: () => {
                                        setConfirmation(null);
                                    },
                                } as IMotDePasseConfirmation)
                            }}>
                                <img src="/svg/TrashCanIcon.svg" alt="Supprimer" />
                            </button>
                        </div>
                    </div>
                    <div className="icon-fermer" onClick={() => {
                        setChoix(MotDePasseChoix.NONE);
                    }}>
                        <img src="/svg/XMarkIcon.svg" alt="Fermer" />
                    </div>
                </div>
                <div className="password-detail-contenu">
                    <div className="detail-titre">
                        <p className="titre">{motDePasseActif.titre}</p>
                        <p><FormattedMessage id="form.dateCreation.passwordDetail" /><FormattedDate value={motDePasseActif.dateCreation} year="numeric" month="long" day="2-digit"/></p>
                    </div>

                    <div className="detail-champs">
                        <label><FormattedMessage id="form.login.passwordDetail" /></label>
                        <div className="detail-champs-text" onClick={() => {
                            navigator.clipboard.writeText(motDePasseActif.nom_utilisateur);
                        }}>
                            <div className="detail-text">
                                {motDePasseActif.nom_utilisateur}
                                <div className="icon-copy">
                                    <img className="icon-copy-image" src="/svg/CopyIcon.svg" alt="Copier" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-champs">
                        <label><FormattedMessage id="form.password.passwordDetail" /></label>
                        <div className="detail-champs-text" onClick={() => {
                            navigator.clipboard.writeText(motDePasseActif.password);
                        }}>
                            <div className="detail-text">
                                {motDePasseActif.password}
                                <div className="icon-copy">
                                    <img className="icon-copy-image" src="/svg/CopyIcon.svg" alt="Copier" />
                                </div>
                            </div>
                            <div className="detail-icon-cache">
                                <img src="/svg/EyeIcon.svg" alt="Visible" />
                            </div>
                        </div>
                    </div>

                    <div className="detail-champs">
                        <label><FormattedMessage id="form.url.passwordDetail" /></label>
                        <div className="detail-champs-text" onClick={() => {
                            navigator.clipboard.writeText(motDePasseActif.url);
                        }}>
                            <div className="detail-text">
                                {motDePasseActif.url}
                                <div className="icon-copy">
                                    <img className="icon-copy-image" src="/svg/CopyIcon.svg" alt="Copier" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-champs">
                        <label><FormattedMessage id="form.notes.passwordDetail" /></label>
                        <div className="detail-champs-text" onClick={() => {
                            navigator.clipboard.writeText(motDePasseActif.notes);
                        }}>
                            <div className="detail-text">
                                {motDePasseActif.notes}
                                <div className="icon-copy">
                                    <img className="icon-copy-image" src="/svg/CopyIcon.svg" alt="Copier" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-champs">
                        <label><FormattedMessage id="form.tags.passwordDetail" /></label>
                        <div className="detail-champs-text" onClick={() => {
                            navigator.clipboard.writeText(tagString);
                        }}>
                            <div className="detail-text">
                                {tagString}
                                <div className="icon-copy">
                                    <img className="icon-copy-image" src="/svg/CopyIcon.svg" alt="Copier" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}