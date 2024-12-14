import "./PopupFiltre.scss"
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MotDePasseContext } from "../lib/PasswordContext";

export default function PopupFiltre(props: {position: {top: number, left: number}}) {
    const { tagsFiltre, motDePasses, setTagsFiltre } = useContext(MotDePasseContext);
    const location = useLocation();
    const navigate = useNavigate();
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagsTousMotDePasse, setTagsTousMotDePasse] = useState<string[]>([]);


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tagsFromUrl = params.get('tags')?.split(',').filter((tag) => tag !== '') || [];
        
        if (tagsFromUrl.length === 0) {
            params.delete('tags');
            navigate(`?${params.toString()}`, { replace: true });
        }

        setSelectedTags(tagsFromUrl);
    }, [location.search, navigate])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setTagsFiltre(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setTagsFiltre]);

    
    useEffect(() => {
        if (motDePasses)
            setTagsTousMotDePasse([...new Set(motDePasses.flatMap((motDePasse) => motDePasse.tags))])
    }, [motDePasses])

    return (
        <>
        {tagsFiltre &&
            <div ref={popupRef} style={{ position: 'absolute', top: props.position.top, left: props.position.left }}
            className="popup-filtre">
                        {tagsTousMotDePasse.map((tag, i) => <div 
                            key={i} className="tag-popup" onClick={() => {
                                const updatedTags = selectedTags.includes(tag)? selectedTags.filter((t) => t !== tag): [...selectedTags, tag];
                                    
                                const params = new URLSearchParams(window.location.search);
                                params.set('tags', updatedTags.join(','));
                                navigate(`?${params.toString()}`);
                            }}>
                                <label>
                                    <input type="checkbox" checked={selectedTags.includes(tag)} readOnly/>
                                    {tag}
                                </label>
                        </div>)}
            </div>
        }
        </>
    );
}