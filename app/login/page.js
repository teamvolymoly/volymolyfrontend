import AuthPage from "../../components/AuthPage";

export const metadata = {
  title: "Sign in | Volymoly CRM",
  description: "Sign in to your Volymoly CRM workspace.",
};

export default function LoginPage() {
  return <AuthPage mode="login"/>;
}
