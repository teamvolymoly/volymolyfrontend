import AuthPanel from "../../components/AuthPanel";

export const metadata = {
  title: "Sign in | Volymoly CRM",
  description: "Sign in to your Volymoly CRM workspace.",
};

export default function LoginPage() {
  return <AuthPanel mode="login"/>;
}
