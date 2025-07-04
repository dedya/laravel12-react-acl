import PageMeta from "../../../Components/common/PageMeta";
import SignUpForm from "../../../Components/Auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      
        <SignUpForm />
      
    </>
  );
}
