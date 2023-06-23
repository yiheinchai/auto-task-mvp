import Link from "next/link";
import Image from "next/image";

export default function Me() {
  return (
    <>
      <h1>Me</h1>
      <Image src="/images/profile.jpg" height={144} width={144} />
      <Link href="/">Back to home</Link>
    </>
  );
}
