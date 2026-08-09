import AuthPage from "../../components/AuthPage";

export const metadata = {
  title: "Create account | Volymoly CRM",
  description: "Create your Volymoly CRM workspace account.",
};

export default function RegisterPage() {
  return <AuthPage mode="register"/>;
}
