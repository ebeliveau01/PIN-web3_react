import { useContext, useState } from "react"
import "./PasswordAjout.scss"
import { MotDePasseChoix, MotDePasseContext } from "../../lib/PasswordContext"
import { IMotDePasse, IMotDePasseConfirmation, IMotDePasseVide } from "../../lib/types";
import axios from "axios";
import { URL_BASE } from "../../lib/variable";
import { getJWT } from "../../lib/Authentification";
import { FormattedMessage } from "react-intl";

export default function PasswordAjout() {
    const { motDePasses, modificationEffectuee, setMotDePasses, setChoix, setConfirmation, setModificationEffectuee} = useContext(MotDePasseContext);
    const [motDePasseActifTemp, setMotDePasseActifTemp] = useState<IMotDePasse>(IMotDePasseVide);
    const [erreurTitre, setErreurTitre] = useState<string>("");
    const [erreurUrl, setErreurUrl] = useState<string>("");

    function ChangementTitre(e: React.FocusEvent<HTMLInputElement>) {
        if (e.target.value.length != 0) {
            let nouveauMotDePasseActif: IMotDePasse 
            nouveauMotDePasseActif = {...motDePasseActifTemp}
            nouveauMotDePasseActif.titre = e.target.value;
            setMotDePasseActifTemp(nouveauMotDePasseActif);
            
            setModificationEffectuee(true);
            setErreurTitre("");
        }
        else
            setErreurTitre("password.ajout.erreur.titre");
    }

    function ChangementLogin(e: React.FocusEvent<HTMLInputElement>) {
        let nouveauMotDePasseActif: IMotDePasse 
        nouveauMotDePasseActif = {...motDePasseActifTemp}
        nouveauMotDePasseActif.nom_utilisateur = e.target.value;
        setMotDePasseActifTemp(nouveauMotDePasseActif);

        setModificationEffectuee(true);
    }

    function ChangementPassword(e: React.FocusEvent<HTMLInputElement>) {
        let nouveauMotDePasseActif: IMotDePasse 
        nouveauMotDePasseActif = {...motDePasseActifTemp}
        nouveauMotDePasseActif.password = e.target.value;
        setMotDePasseActifTemp(nouveauMotDePasseActif);

        setModificationEffectuee(true);
    }

    function ChangementUrl(e: React.FocusEvent<HTMLInputElement>) {
        let testUrl = /^(http|https):\/\/.+\..+/; 
        if (testUrl.test(e.target.value)) {
            let nouveauMotDePasseActif: IMotDePasse

            setModificationEffectuee(true);
        
            nouveauMotDePasseActif = {...motDePasseActifTemp}
            nouveauMotDePasseActif.url = e.target.value;
            setMotDePasseActifTemp(nouveauMotDePasseActif);
            setErreurUrl("");
        }
        else
            setErreurUrl("password.ajout.erreur.url");
    }

    function ChangementNotes(e: React.FocusEvent<HTMLTextAreaElement>) {
        let nouveauMotDePasseActif: IMotDePasse 
        nouveauMotDePasseActif = {...motDePasseActifTemp}
        nouveauMotDePasseActif.notes = e.target.value;
        setMotDePasseActifTemp(nouveauMotDePasseActif);

        setModificationEffectuee(true);
    }

    function ChangementTags(e: React.FocusEvent<HTMLInputElement>) {
        let nouveauMotDePasseActif: IMotDePasse 
        nouveauMotDePasseActif = {...motDePasseActifTemp}
        nouveauMotDePasseActif.tags = e.target.value.split(" ");
        setMotDePasseActifTemp(nouveauMotDePasseActif);

        setModificationEffectuee(true);
    }

    async function SubmitForm() {
        if (modificationEffectuee && motDePasseActifTemp) {
            await axios.post(URL_BASE+'motdepasse/add', { motDePasse: {...motDePasseActifTemp}}, {
                headers: {
                    authorization: `${getJWT()}`,
                },
            })
            .then((response) => {
                console.log(response.status);
                setMotDePasses([...motDePasses, motDePasseActifTemp])
                setChoix(MotDePasseChoix.NONE)
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
        }
    }

    return (
        <>
            {<div className="password-ajout">
                <div className="password-ajout-header">
                    <h1><FormattedMessage id="password.ajout.titre" /></h1>
                    <div className="icon-fermer" onClick={() => {
                        if (modificationEffectuee)
                            setConfirmation({
                                titre: "confirmation.titre.passwordAjout",
                                description: (<><FormattedMessage id="confirmation.description.passwordAjout" values={{ titre: motDePasseActifTemp?.titre }}/></>),
                                textBouton1: "confirmation.textBouton1.passwordAjout",
                                textBouton2: "confirmation.textBouton2.passwordAjout",
                                bouton1OnClick: () => {
                                    SubmitForm();
                                    setConfirmation(null);
                                    setModificationEffectuee(false);
                                },
                                bouton2OnClick: () => {
                                    setConfirmation(null);
                                    setChoix(MotDePasseChoix.NONE);
                                    setModificationEffectuee(false);
                                },
                            } as IMotDePasseConfirmation)
                        else
                            setChoix(MotDePasseChoix.NONE)
                    }}>
                        <img src="/svg/XMarkIcon.svg" alt="Fermer" />
                    </div>
                </div>
                <form id="form-ajout-motdepasse" className="password-ajout-contenu">
                    <div className="ajout-champs ajout-titre">
                        <label className={`${erreurTitre !== ""? "erreur": ""}`}><FormattedMessage id="form.titre.passwordAjout"/></label>
                        <input id="form-ajout-motdepasse-titre" name="titre" className={`ajout-text titre ${erreurTitre !== ""? "erreur": ""}`} onBlur={ChangementTitre} />
                    </div>

                    <div className="ajout-champs">
                        <label><FormattedMessage id="form.login.passwordAjout"/></label>
                        <input id="form-ajout-motdepasse-login" name="login" className="ajout-text" onBlur={ChangementLogin} />
                    </div>

                    <div className="ajout-champs">
                        <label><FormattedMessage id="form.password.passwordAjout"/></label>
                        <input id="form-ajout-motdepasse-password" name="password" className="ajout-text" onBlur={ChangementPassword} />
                    </div>

                    <div className="ajout-champs">
                        <label className={`${erreurUrl !== ""? "erreur": ""}`}><FormattedMessage id="form.url.passwordAjout"/></label>
                        <input id="form-ajout-motdepasse-url" name="url" className={`ajout-text ${erreurUrl !== ""? "erreur": ""}`} onBlur={ChangementUrl} />
                    </div>

                    <div className="ajout-champs">
                        <label><FormattedMessage id="form.notes.passwordAjout"/></label>
                        <textarea id="form-ajout-motdepasse-notes" name="notes" className="ajout-text" onBlur={ChangementNotes} />
                    </div>

                    <div className="ajout-champs">
                        <label><FormattedMessage id="form.tags.passwordAjout"/></label>
                        <input id="form-ajout-motdepasse-tags" name="tags" className="ajout-text" onBlur={ChangementTags} />
                    </div>
                    
                    <div className="ajout-bouton">
                        <button type="button" onClick={() => { SubmitForm(); }}>
                            <FormattedMessage id="form.bouton.passwordAjout"/>
                        </button>
                    </div>
                </form>
            </div>}
        </>
    )
}