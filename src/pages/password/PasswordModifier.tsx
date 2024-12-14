import { useContext, useEffect, useState } from "react"
import "./PasswordModifier.scss"
import { MotDePasseChoix, MotDePasseContext } from "../../lib/PasswordContext"
import { IMotDePasse, IMotDePasseConfirmation, IMotDePasseVide } from "../../lib/types";
import axios from "axios";
import { URL_BASE } from "../../lib/variable";
import { getJWT } from "../../lib/Authentification";
import { FormattedDate, FormattedMessage } from "react-intl";

export default function PasswordModifier() {
    const { motDePasses, motDePasseActif, modificationEffectuee, setMotDePasses, setMotDePasseActif, setChoix, setConfirmation, setModificationEffectuee} = useContext(MotDePasseContext);
    const [motDePasseActifTemp, setMotDePasseActifTemp] = useState<IMotDePasse>(IMotDePasseVide);
    const [erreurTitre, setErreurTitre] = useState<string>("");
    const [erreurUrl, setErreurUrl] = useState<string>("");

    let tagString = "";

    if (motDePasseActif != null) {
        motDePasseActif.tags.forEach(tag => {
            tagString += tag+" "
        });
    }

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
            setErreurTitre("password.modifier.erreur.titre");
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
            setErreurUrl("password.modifier.erreur.url");
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
        nouveauMotDePasseActif.tags = e.target.value.split(",");
        setMotDePasseActifTemp(nouveauMotDePasseActif);

        setModificationEffectuee(true);
    }

    async function SubmitForm() {
        if (modificationEffectuee && motDePasseActifTemp) {
            await axios.put(URL_BASE+'motdepasse/update', { motDePasse: {...motDePasseActifTemp}}, {
                headers: {
                    authorization: `${getJWT()}`,
                },
            })
            .then((response) => {
                console.log(response.status);
                setMotDePasses(motDePasses.map((motDePasse) => 
                    motDePasse._id === motDePasseActifTemp._id?
                        motDePasseActifTemp: motDePasse
                ));
                setChoix(MotDePasseChoix.DETAIL);
                setMotDePasseActif(motDePasseActifTemp);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
        }
    }

    useEffect(() => {
        if (motDePasseActif)
            setMotDePasseActifTemp(motDePasseActif)
    }, [])
    
    return (
        <>
            {motDePasseActif && <div className="password-modifier">
                <div className="password-modifier-header">
                    <h1><FormattedMessage id="password.modifier.titre" /></h1>
                    <div className="icon-fermer" onClick={() => {
                        if (modificationEffectuee)
                            setConfirmation({
                                titre: "confirmation.titre.passwordModifier",
                                description: (<><FormattedMessage id="confirmation.description.passwordModifier" values={{ titre: motDePasseActif.titre}} /></>),
                                textBouton1: "confirmation.textBouton1.passwordModifier",
                                textBouton2: "confirmation.textBouton2.passwordModifier",
                                bouton1OnClick: () => {
                                    SubmitForm();
                                    setConfirmation(null);
                                    setModificationEffectuee(false);
                                },
                                bouton2OnClick: () => {
                                    setConfirmation(null);
                                    setChoix(MotDePasseChoix.DETAIL)
                                    setModificationEffectuee(false);
                                },
                            } as IMotDePasseConfirmation)
                        else
                            setChoix(MotDePasseChoix.NONE)
                    }}>
                        <img src="/svg/XMarkIcon.svg" alt="Fermer" />
                    </div>
                </div>
                <form id="form-modification-motdepasse" className="password-modifier-contenu">
                    <div className="modifier-champs modifier-titre">
                        <input id="form-modification-motdepasse-titre" name="titre" className={`modifier-text titre ${erreurTitre !== ""? "erreur": ""}`} defaultValue={motDePasseActif.titre} onBlur={ChangementTitre} />
                        <p><FormattedMessage id="form.dateCreation.passwordDetail" /><FormattedDate value={motDePasseActif.dateCreation} year="numeric" month="long" day="2-digit"/></p>
                    </div>

                    <div className="modifier-champs">
                        <label><FormattedMessage id="form.login.passwordModifier" /></label>
                        <input id="form-modification-motdepasse-login" name="login" className="modifier-text" defaultValue={motDePasseActif.nom_utilisateur} onBlur={ChangementLogin} />
                    </div>

                    <div className="modifier-champs">
                        <label><FormattedMessage id="form.password.passwordModifier" /></label>
                        <input id="form-modification-motdepasse-password" name="password" className="modifier-text" defaultValue={motDePasseActif.password} onBlur={ChangementPassword} />
                    </div>

                    <div className="modifier-champs">
                        <label className={`${erreurUrl !== ""? "erreur": ""}`}><FormattedMessage id="form.url.passwordModifier" /></label>
                        <input id="form-modification-motdepasse-url" name="url" className={`modifier-text ${erreurUrl !== ""? "erreur": ""}`} defaultValue={motDePasseActif.url} onBlur={ChangementUrl} />
                    </div>

                    <div className="modifier-champs">
                        <label><FormattedMessage id="form.notes.passwordModifier" /></label>
                        <textarea id="form-modification-motdepasse-notes" name="notes" className="modifier-text" defaultValue={motDePasseActif.notes} onBlur={ChangementNotes} />
                    </div>

                    <div className="modifier-champs">
                        <label><FormattedMessage id="form.tags.passwordModifier" /></label>
                        <input id="form-modification-motdepasse-tags" name="tags" className="modifier-text" defaultValue={tagString} onBlur={ChangementTags} />
                    </div>

                    <div className="modifier-bouton">
                        <button type="button" onClick={() => { SubmitForm(); }}>
                            <FormattedMessage id="form.bouton.passwordModifier" />
                        </button>
                    </div>
                </form>
            </div>}
        </>
    )
}