import { useEffect } from "react";
import "./DashboardContenu.scss";
import { estAuthentifie } from "../../lib/Authentification";

export default function DashboardContenu(props: any) {
    useEffect(() => {
        if(!estAuthentifie())
            window.location.replace("/login");
    }, [])
    return (
        <div className="contenu">
            <div className="dashboard">
                {props.children}
            </div>
        </div>
    )
}