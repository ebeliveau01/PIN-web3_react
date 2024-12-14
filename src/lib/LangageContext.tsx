import React, { useEffect, useState } from 'react';
import Francais from '../lang/fr.json';
import Anglais from '../lang/en.json';
import { IntlProvider } from 'react-intl';

export type IChoixLangage = "fr" | "en";
export type IChoixMessages = typeof Francais | typeof Anglais;

export type LangageContextType = {
    langageInterface: IChoixLangage;
    messages: IChoixMessages;
    setLangageInterface: (langage: IChoixLangage) => void;
    setMessages: (messages: IChoixMessages) => void;
};

export const LangageContext = React.createContext<LangageContextType>({
    langageInterface: "fr",
    messages: Francais,
    setLangageInterface: () => {},
    setMessages: () => {},
});

export default function LangageProvider(props: any) {
    const [langageInterface, setLangageInterface] = useState<IChoixLangage>("fr");
    const [messages, setMessages] = useState<IChoixMessages>(Francais);

    useEffect(() => {
        const storedLang = localStorage.getItem('language') as IChoixLangage | null;
        if (storedLang) {
            setLangageInterface(storedLang);
            setMessages(storedLang === 'fr' ? Francais : Anglais);
        } else {
            setLangageInterface('fr');
            setMessages(Francais);
        }
    }, []);

    const values = {
        langageInterface,
        messages,
        setLangageInterface,
        setMessages,
    };

    return (
        <LangageContext.Provider value={values}>
            <IntlProvider locale={langageInterface} messages={messages}>
                {props.children}
            </IntlProvider>
        </LangageContext.Provider>
    );
}