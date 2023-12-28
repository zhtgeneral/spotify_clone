'use client'

import { useRouter } from "next/navigation"

const ListItem = ({
  image,
  name,
  href
}: {
  image: string,
  name: string,
  href: string
}) => {
  const router = useRouter();

  const onClick = () => {
    // todo auth
    router.push(href);
  }
  return (
    <button className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'>
      <div className='relative min-h-[64px] min-w-[64px]'>
        {/* <Image /> */}
      </div>
    </button>
  )
}
export default ListItem