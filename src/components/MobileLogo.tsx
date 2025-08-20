import Image from "next/image"
import Link from "next/link"

export default function MobileLogo() {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image src="/logo-branco.png" alt="Sandora" width={120} height={30} />
    </Link>
  )
}
