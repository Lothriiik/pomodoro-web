import { useEffect } from "react";
import LoginForm from "@/components/LoginForm";
import DesktopLogo from "@/components/DesktopLogo";
import MobileLogo from "@/components/MobileLogo";

export default function Login() {
  useEffect(() => {
    document.title = "Login | Sandora";
  }, []);

  return (
    <>
      {/* desktop */}
      <div className="hidden min-h-screen w-full md:flex">
        <div className="flex w-full flex-col p-10 md:w-[45%] bg-primaryPurple">
          <div className="mb-16 ml-6">
            <DesktopLogo />
          </div>

          <div className="flex flex-1 flex-col justify-center mb-34 ml-6">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold text-grayText tracking-tight">
                Bem-vindo(a) de volta!
              </h1>
              <p className="mt-3 text-lg text-grayText font-medium leading-none max-w-95">
                Faça login com seu e-mail para acessar seus cursos.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden w-[55%] md:block bg-primaryBackground">
          <div className="flex h-full items-center justify-center">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex min-h-screen flex-col bg-primaryPurple md:hidden">
        <div className="flex flex-col h-screen">
          <div className="p-8 flex flex-col bg-primaryPurple min-h-[40%]">
            <div className="mt-2">
              <MobileLogo />
            </div>

            <div className="mt-4">
              <h1 className="text-white text-3xl font-bold mt-10">
                Bem-vindo(a) de volta!
              </h1>
              <p className="text-white mt-4 text-base">
                Faça login com seu e-mail para acessar seus cursos.
              </p>
            </div>
          </div>

          <div className="rounded-t-3xl bg-white p-6 flex-1">
            <h2 className="mb-6 text-center text-2xl font-semibold">
              Login
            </h2>
            <LoginForm isMobile />
          </div>
        </div>
      </div>
    </>
  );
}
