import { useRef, useState } from "react"
import "./SearchBar.scss"
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [focused, setFocused] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [valeurRecherche, setValeurRecherche] = useState("");
    const navigate = useNavigate();

    const handleDivClick = () => {
        setFocused(true);
        inputRef.current?.focus();
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        setValeurRecherche(e.target.value);
        const params = new URLSearchParams(window.location.search);

        if (valeurRecherche != "") {
            params.set('recherche', valeurRecherche);
            navigate(`?${params.toString()}`);
            return;
        }
        params.delete('recherche');
        navigate(`?${params.toString()}`);
    };

    return (
        <div className="search-bar">
            <div className={`search-bar-champs ${focused? "focused": ""}`} onClick={handleDivClick}>
                <button type="button" className="bouton-search">
                    <img src="/svg/MagnifyingGlassIcon.svg" alt="Search" width={24} height={24} />
                </button>
                <div className="search-bar-text">
                    <input ref={inputRef} name="advanced-search" type="text" className="search-bar-input" onBlur={handleInputBlur}/>
                </div>
            </div>
        </div>
    )
}