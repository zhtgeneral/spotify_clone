'use client'

import { useRouter } from "next/navigation";
import Modal from "./Modal"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";


const AuthModal = () => {
  // comes from supabase docs for login using auth
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();

  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose])

  const onChange = () => {
    if (isOpen) onClose();
  }

  return (
    <Modal title="Welcome back" description="Login to your account" isOpen={isOpen} onChange={onChange}>
      <Auth
        theme="dark" 
        magicLink={true}
        providers={['google', 'github']}
        supabaseClient={supabaseClient} 
        appearance={{
          theme: ThemeSupa, variables: {
          default: {
            colors: {
              brand: '#404040',
              brandAccent: "#22c55e"
            }
          }
        }}}
        redirectTo={process.env.NEXT_PUBLIC_HOST_DOMAIN} />
    </Modal>
  )
}

export default AuthModal