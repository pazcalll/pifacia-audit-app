import BackButton from "@/components/elements/back-button";
import LoginForm from "@/components/fragments/login-form";

export default function Page() {
  return (
    <div>
      <BackButton />
      <LoginForm
        title="Staff Login"
        caption="Please enter your username and password to login."
        registrationEndpoint="/auth/user/register"
      />
    </div>
  );
}
