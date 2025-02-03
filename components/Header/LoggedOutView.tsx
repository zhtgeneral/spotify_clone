import Button from "@/components/Button";
import useAuthModal from "@/hooks/modals/useAuthModal";

/**
 * This component renders the Signup and Login button.
 * 
 * @requires user needs to be signed out.
 */
export default function LoggedOutView(){
  const AuthModal = useAuthModal();
  return (
    <>
      <div>
        <Button
          onClick={AuthModal.onOpen}
          className="bg-transparent text-neutral-300 font-medium"
        >
          Sign up
        </Button>
      </div>
      <div>
        <Button
          onClick={AuthModal.onOpen}
          className="bg-white px-6 py-2"
        >
          Log in
        </Button>
      </div>
    </>
  )
}