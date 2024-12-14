import PasswordCard from "../../ui/PasswordCard";
import SearchBar from "../../ui/SearchBar";
import "./PasswordPage.scss";
import { MotDePasseChoix, MotDePasseContext } from "../../lib/PasswordContext";
import { useContext, useEffect, useRef, useState } from "react";
import PasswordDetail from "./PasswordDetail";
import PasswordModifier from "./PasswordModifier";
import Confirmation from "../../ui/Confirmation";
import PasswordAjout from "./PasswordAjout";
import axios from "axios";
import { URL_BASE } from "../../lib/variable";
import { useLocation } from "react-router-dom";
import PopupFiltre from "../../ui/PopupFiltre";
import { getJWT } from "../../lib/Authentification";
import { FormattedMessage } from "react-intl";

export default function PasswordPage() {
    const location = useLocation();
    const { tagsFiltre, motDePasses, motDePasseActif, choix, confirmation, setChoix, setMotDePasses, setTagsFiltre } = useContext(MotDePasseContext);
    const [filtrePosition, setFiltrePosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const FiltreBoutonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const fetchMotDePasses = async () => {
            await axios.get(URL_BASE+'motdepasse/all', {
                headers: {
                    authorization: `${getJWT()}`,
                },
            })
            .then((response) => {
                if (response.status === 200)
                setMotDePasses(response.data.motsDePasse);
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        const fetchMotDePassesFiltres = async () => {
            const recherche = params.get("recherche") || "";
            const tags = params.getAll("tags").join(",") || "";

            await axios.get(URL_BASE+'motdepasse/filtres', {
                headers: {
                    authorization: `${getJWT()}`,
                },
                params: {
                    tags: tags,
                    recherche: recherche
                }
            })
            .then((response) => {
                if (response.status === 200)
                setMotDePasses(response.data.motsDePasse);
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        if (params.has("tags") || params.has("recherche"))
            fetchMotDePassesFiltres();
        else
            fetchMotDePasses();
    }, [location.search])

    return (
        <>
            <div className="header">
                <div className="header-text"><p><FormattedMessage id="password.page.titre" /></p></div>
                <div className="options">
                    <button className="ajout-option" onClick={() => {
                        setChoix(MotDePasseChoix.AJOUTER);
                    }}>
                        <img src="/svg/PlusIcon.svg" />
                        <FormattedMessage id="password.page.option1" />
                    </button>
                    <button className="filtre-option" onClick={() => {
                        if (FiltreBoutonRef.current) {
                            const rect = FiltreBoutonRef.current.getBoundingClientRect();
                            setFiltrePosition({
                                top: rect.bottom+20,
                                left: rect.left-300
                            });
                            setTagsFiltre(!tagsFiltre);
                        }
                    }} ref={FiltreBoutonRef}>
                        <img src="/svg/SliderIcon.svg" />
                        <FormattedMessage id="password.page.option2" />
                    </button>
                    <div className="options-milieu"></div>
                    <SearchBar /> 
                </div>
            </div>
            <PopupFiltre position={filtrePosition} />

            <div className="password-body">
                <div className="password-content no-scrollbar" >
                    { motDePasses && motDePasses.map((motdepasse, i) => <PasswordCard key={i} motdepasse={motdepasse} />) }
                </div>
                { choix != MotDePasseChoix.NONE && motDePasseActif && ( <>
                    { choix == MotDePasseChoix.DETAIL && <PasswordDetail /> }
                    { choix == MotDePasseChoix.MODIFIER && <PasswordModifier /> }
                </> )}

                {choix === MotDePasseChoix.AJOUTER && <PasswordAjout />}
            </div>

            { confirmation && <div id="confirmation-modification">
                <Confirmation titre={confirmation.titre} description={confirmation.description} 
                    textBouton1={confirmation.textBouton1} textBouton2={confirmation.textBouton2}
                    bouton1OnClick={confirmation.bouton1OnClick} bouton2OnClick={confirmation.bouton2OnClick}
                />
            </div>}
        </>
    )
}