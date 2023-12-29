'use client'

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";


const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) return null;
  
  return (
    <>
      <Modal title='test' description="desc" isOpen={true} onChange={() => {}}>
        children
      </Modal>
    </>
  )
}

export default ModalProvider;