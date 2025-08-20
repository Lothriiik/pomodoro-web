import Image from "next/image"
import Link from "next/link"

export default function DesktopLogo() {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image src="/logo.png" alt="Sandora" width={120} height={30} />
    </Link>
  )
}
