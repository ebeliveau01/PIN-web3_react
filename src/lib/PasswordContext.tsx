import React, { useState } from 'react';
import { IMotDePasse, IMotDePasseConfirmation } from './types';

export enum MotDePasseChoix {
    NONE,
    DETAIL,
    AJOUTER,
    MODIFIER
}

export type MotDePasseContextType = {
    motDePasseActif: IMotDePasse | null;
    motDePasses: IMotDePasse[];
    choix: MotDePasseChoix;
    confirmation: IMotDePasseConfirmation | null;
    modificationEffectuee: boolean;
    tagsFiltre: boolean;
    setMotDePasseActif: (motDePasseActif: IMotDePasse | null) => void;
    setMotDePasses: (motDePasses: IMotDePasse[]) => void;
    setChoix: (choix: MotDePasseChoix) => void;
    setConfirmation: (confirmation: IMotDePasseConfirmation | null) => void;
    setModificationEffectuee: (valeur: boolean) => void;
    setTagsFiltre: (valeur: boolean) => void;
};

const motdepasseVide: IMotDePasse | null = null;
const motdepassesVide: IMotDePasse[] = [];
const confirmationVide: IMotDePasseConfirmation | null = null;

export const MotDePasseContext = React.createContext<MotDePasseContextType>({
    motDePasseActif: null,
    motDePasses: [],
    choix: MotDePasseChoix.NONE,
    confirmation: null,
    modificationEffectuee: false,
    tagsFiltre: false,
    setMotDePasseActif: () => {},
    setMotDePasses: () => {},
    setChoix: () => {},
    setConfirmation: () => {},
    setModificationEffectuee: () => {},
    setTagsFiltre: () => {},
});

export default function MotDePasseProvider(props: any) {
    const [motDePasseActif, setMotDePasseActif] = useState(motdepasseVide);
    const [motDePasses, setMotDePasses] = useState(motdepassesVide);
    const [confirmation, setConfirmation] = useState(confirmationVide);
    const [modificationEffectuee, setModificationEffectuee] = useState(false);
    const [choix, setChoix] = useState(MotDePasseChoix.NONE);
    const [tagsFiltre, setTagsFiltre] = useState(false);

    const values = {
        motDePasseActif,
        motDePasses,
        choix,
        confirmation,
        modificationEffectuee,
        tagsFiltre,
        setMotDePasseActif,
        setMotDePasses,
        setChoix,
        setConfirmation,
        setModificationEffectuee,
        setTagsFiltre
    };

    return (
        <MotDePasseContext.Provider value={values}>
            {props.children}
        </MotDePasseContext.Provider>
    );
}