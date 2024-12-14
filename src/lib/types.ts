import { ReactNode } from "react";
import { getUuid } from "./Authentification";

export type IMotDePasse = {
    titre: string;
    nom_utilisateur: string;
    password: string;
    url: string;
    notes: string;
    dateCreation: Date;
    tags: string[];
    utilisateurId: string;
    _id?: string;
}

export function IMotDePasseVide():IMotDePasse {
    return {
        titre: "",
        nom_utilisateur: "",
        password: "",
        url: "",
        notes: "",
        dateCreation: new Date,
        tags: [],
        utilisateurId: getUuid() as string
    }
}

export type IMotDePasseConfirmation = {
    titre: string;
    description: ReactNode;
    textBouton1?: string;
    textBouton2?: string;
    bouton1OnClick?: () => void;
    bouton2OnClick?: () => void;
}

export type IUtilisateur = {
    nom_utilisateur: string;
    email: string;
    mot_de_passe: string;
    cle_api: string;
    actif: boolean;
    role: number;
    _id?: string;
}

export function IUtilisateurVide():IUtilisateur {
    return {
        nom_utilisateur: "",
        email: "",
        mot_de_passe: "",
        cle_api: "",
        actif: false,
        role: 0,
    }
}