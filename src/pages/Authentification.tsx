import { useState } from "react";
import clsx from 'clsx';

import "./Authentification.scss"
import { URL_BASE } from "../lib/variable";
import axios from "axios";
import { setJWT } from "../lib/Authentification";
import { FormattedMessage } from "react-intl";

export default function Authentification() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [stayLogin, setStayLogin] = useState(false);
    const [errors, setErrors] = useState({username: "", password: ""});
    const [apiError, setApiError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await axios.post(URL_BASE+"generatetoken", { utilisateur: { nom_utilisateur: username, email: username, mot_de_passe: password}})
        .then((response) => {
            setJWT(response.data.id, response.data.token);
            window.location.replace("/dashboard");
        })
        .catch((error) => {
            console.log(error.response.data.message);
        });
    }
    
    return (
        <div className="auth-container">
            <form id="form-login" name="form-login" className="form-login" onSubmit={handleSubmit}>
                <div className="error-message">{apiError}</div>

                <div className="input-group">
                    <label htmlFor="username"><FormattedMessage id="auth.email.label" /><span className="requis">*</span></label>
                    <input type="text" className={clsx('form-input', {'error': errors.username !== ""})} name="email" id="email" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
                    <div className="error-message">{errors.username}</div>
                </div>

                <div className="input-group">
                    <label htmlFor="password"><FormattedMessage id="auth.password.label" /><span className="requis">*</span></label>
                    <input type="password" className={clsx('form-input', {'error': errors.password !== ""})} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="error-message">{errors.password}</div>
                </div>

                <div className="stay-login">
                    <label htmlFor="stay-login"><FormattedMessage id="auth.stay.label" /></label>
                    <input type="checkbox" name="stay-login" id="stay-login" checked={stayLogin} onChange={(e) => setStayLogin(e.target.checked)}/>
                </div>

                <div className="submit-button">
                    <button type="submit" name="submit"><FormattedMessage id="auth.submit.label" /></button>
                </div>
            </form>
        </div>
    )
}