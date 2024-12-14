import MotDePasseProvider from "../../lib/PasswordContext";
import PasswordPage from "./PasswordPage";

export default function PasswordMain() {
    return (
        <MotDePasseProvider>
            <PasswordPage />
        </MotDePasseProvider>
    )
}