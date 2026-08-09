import AuthPanel from "../../components/AuthPanel";

export const metadata = {
  title: "Create account | Volymoly CRM",
  description: "Create your Volymoly CRM workspace account.",
};

export default function RegisterPage() {
  return <AuthPanel mode="register"/>;
}
