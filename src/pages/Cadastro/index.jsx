import { useEffect } from "react";
import CadastroForm from "@/components/features/Auth/CadastroForm"
import DesktopLogo from "@/components/layout/DesktopLogo"
import MobileLogo from "@/components/layout/MobileLogo"

export default function Cadastro() {
  useEffect(() => {
    document.title = "Cadastro | Pomodoro";
  }, []);
  return (
    <>
      {/* desktop */}
      <div className="hidden min-h-screen w-full md:flex">
        <div className="flex w-full flex-col p-10 md:w-[45%] bg-primaryPurple">
          <div className="mb-10 ml-6">
            <DesktopLogo />
          </div>
          <div className="flex flex-1 flex-col justify-center mb-34 ml-6">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold text-grayText tracking-tight">
                Crie sua conta e comece a aprender
              </h1>
              <p className="mt-3 text-lg text-grayText font-medium max-w-95 leading-none">
                Crie sua conta em poucos segundos e comece sua jornada de aprendizado.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden w-[55%] md:block bg-primaryBackground">
          <div className="flex h-full items-center justify-center ">
            <CadastroForm />
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex min-h-screen flex-col bg-primaryPurple md:hidden">
        <div className="flex flex-col h-screen">
          <div className="p-8 flex flex-col bg-primaryPurple min-h-[47%] ">
            <div className="mt-">
              <MobileLogo />
            </div>
            <div className="text-white mt-4">
              <h1 className="text-3xl font-bold">
                Crie sua conta e comece a{" "}
                <span className="text-primaryPurple bg-primaryBackground pl-1 pr-1 pb-[2px] rounded">aprender</span>
              </h1>
              <p className="text-white mt-4 text-base">
                <span className="text-primaryPurple bg-primaryBackground pl-1 pr-1 pb-[2px] pt-[2px] rounded ">
                  Crie sua conta em poucos segundos
                </span>
                {" "}e comece sua jornada de aprendizado.
              </p>
            </div>
          </div>

          <div className="rounded-t-3xl bg-primaryBackground p-6">
            <h2 className="mb-6 text-center text-2xl font-semibold text-white">
              Cadastro
            </h2>
            <CadastroForm isMobile={true} />
          </div>
        </div>
      </div>
    </>
  )
}