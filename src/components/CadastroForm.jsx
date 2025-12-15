"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputErrorTooltip } from "./InputError"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CadastroFormProps {
  isMobile?: boolean
}

export default function CadastroForm({ isMobile = false }: CadastroFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    email: "",
    senha: "",
    confirmarSenha: ""
  })

  const isFormIncomplete =
    !form.nome.trim() ||
    !form.empresa.trim() ||
    !form.email.trim() ||
    !form.senha ||
    !form.confirmarSenha

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: "" }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!form.nome.trim()) 
      newErrors.nome = "Nome é obrigatório"
    if (!form.empresa.trim()) 
      newErrors.empresa = "Empresa é obrigatória"
    if (!form.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Informe um e-mail válido"
    }
    if (!form.senha || form.senha.length < 6)
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres"
    if (form.confirmarSenha !== form.senha)
      newErrors.confirmarSenha = "As senhas não coincidem"
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
     setErrors({})

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      setForm({
      nome: "",
      empresa: "",
      email: "",
      senha: "",
      confirmarSenha: ""
      })

    } catch (error) {
      console.error("Erro no envio:", error)
    } finally {

      toast.success("Cadastro realizado com sucesso!");

    setTimeout(() => {
      router.push("/login");
    }, 3000);
      setIsLoading(false)
    }
  }

  const renderFields = () => (
    <>
      <div className="relative space-y-1">
        <Label htmlFor="nome">Nome Completo</Label>
        <Input
          id="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Como você será identificada na plataforma."
          hasError={!!errors.nome}
        />
        {errors.nome && <InputErrorTooltip message={errors.nome} />}
      </div>

      <div className="relative space-y-2">
        <Label htmlFor="empresa">Empresa</Label>
        <Input
          id="empresa"
          value={form.empresa}
          onChange={handleChange}
          placeholder="Insira o nome da empresa."
          hasError={!!errors.empresa}
        />
        {errors.empresa && <InputErrorTooltip message={errors.empresa} />}
      </div>

      <div className="relative space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Será usado para login e comunicações."
          hasError={!!errors.email}
        />
        {errors.email && <InputErrorTooltip message={errors.email} />}
      </div>

      <div className="relative space-y-2">
        <Label htmlFor="senha">Senha</Label>
        <div className="relative">
          <Input
            id="senha"
            type={showPassword ? "text" : "password"}
            value={form.senha}
            onChange={handleChange}
            placeholder="(mín. 6 caracteres)"
            minLength={6}
            hasError={!!errors.senha}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
          </Button>
        </div>
        {errors.senha && <InputErrorTooltip message={errors.senha} />}
      </div>

      <div className="relative space-y-2">
        <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
        <div className="relative">
          <Input
            id="confirmarSenha"
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmarSenha}
            onChange={handleChange}
            placeholder="(mín. 6 caracteres)"
            hasError={!!errors.confirmarSenha}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            <span className="sr-only">{showConfirmPassword ? "Esconder senha" : "Mostrar senha"}</span>
          </Button>
          {errors.confirmarSenha && <InputErrorTooltip message={errors.confirmarSenha} />}
        </div>
      </div>
    </>
  )

  //mobile
  if (isMobile) {
    return (
      <form noValidate className="space-y-4" onSubmit={handleSubmit}>
        {renderFields()}
        <p className="max-w-90 leading-none text-xs">
          Ao criar sua conta, você concorda com nossos{" "}
          <Link href="*" className="text-primaryPurple hover:text-grayMuted hover:underline"><u>Termos de Uso</u></Link>{" "}
          e{" "}
          <Link href="*" className="text-primaryPurple hover:text-grayMuted hover:underline"><u>Política de Privacidade.</u></Link>
        </p>
        <Button type="submit" variant="roxo" size="elgmobile" disabled={isFormIncomplete || isLoading} isLoading={isLoading}>
           CRIAR CONTA
        </Button>
        <div className="text-center text-sm text-gray-500">
          <Link href="/login" className="text-sm text-primaryPurple hover:text-grayMuted hover:underline">
            <u>Já tem uma conta? Entrar</u>
          </Link>
        </div>
      </form>
    )
  }

  //desktop
  return (
    <Card className="w-full h-153 max-w-md border-0 shadow-none md:border md:border-white/10 md:shadow-sm rounded-2xl bg-primaryBackground">
      <CardHeader className="ml-2">
        <CardTitle className="text-3xl mt-2 text-white">Cadastro</CardTitle>
      </CardHeader>
      <CardContent className="justify-center">
        <form noValidate className="space-y-3 flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="space-y-3 w-[95%]">
            {renderFields()}
          </div>
          <div className="text-xs text-muted-foreground w-[95%]">
            <p className="max-w-90 leading-none text-xs text-white/60">
              Ao criar sua conta, você concorda com nossos{" "}
              <Link href="/*" className="text-primaryBlue hover:text-grayMuted"><u>Termos de Uso</u></Link>{" "}
              e{" "}
              <Link href="/*" className="text-primaryBlue hover:text-grayMuted"><u>Política de Privacidade.</u></Link>
            </p>
          </div>
          <Button type="submit" variant="roxo" size="elgdesktop" disabled={isFormIncomplete || isLoading} isLoading={isLoading}>
            CRIAR CONTA
          </Button>
          <div className="text-center text-sm text-white/60">
            <Link href="/login" className="text-primaryBlue hover:text-grayMuted text-sm">
              <u>Já tem uma conta? Entrar</u>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
