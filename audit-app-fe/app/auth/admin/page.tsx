import BackButton from "@/components/elements/back-button";
import LoginForm from "@/components/fragments/login-form";

export default function Page() {
  return (
    <div>
      <BackButton />
      <LoginForm
        title="Admin Login"
        caption="Please enter your username and password to login."
        loginAs="admin"
      />
    </div>
  );
}
