"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputErrorTooltip } from "./InputError"

interface LoginFormProps {
  isMobile?: boolean
}

export default function LoginForm({ isMobile = false }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    email: "",
    senha: "",
    confirmarSenha: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: "" }))
  }

  const isFormIncomplete = !form.email.trim() || !form.senha

  const validateLoginForm = () => {
    const newErrors: { [key: string]: string } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!form.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Email inválido"
    }

    if (!form.senha) {
      newErrors.senha = "Senha é obrigatória"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const validationErrors = validateLoginForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } catch (error) {
      console.error("Erro ao fazer login:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const renderFields = () => (
    <>
      <div className="space-y-2 relative">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Insira seu email cadastrado"
          required
          value={form.email}
          onChange={handleChange}
          hasError={!!errors.email}
        />
        {errors.email && <InputErrorTooltip message={errors.email} />}
      </div>

      <div className="space-y-2 relative">
        <Label htmlFor="senha">Senha</Label>
        <div className="relative">
          <Input
            id="senha"
            type={showPassword ? "text" : "password"}
            placeholder="Insira sua senha"
            required
            value={form.senha}
            onChange={handleChange}
            hasError={!!errors.senha}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
          </Button>
          {errors.senha && <InputErrorTooltip message={errors.senha} />}
        </div>
      </div>
    </>
  )

  // mobile
  if (isMobile) {
    return (
      <form noValidate onSubmit={handleSubmit} className="space-y-4 ">
        {renderFields()}
        <div className="flex justify-start">
          <Link href="/recuperar-senha" className="text-sm text-primaryPurple hover:text-grayMuted hover:underline">
            <u>Esqueci minha senha</u>
          </Link>
        </div>
        <Button type="submit" variant="roxo" size="elgmobile" disabled={isFormIncomplete || isLoading} isLoading={isLoading}>
          FAZER LOGIN
        </Button>
        <div className="text-center text-sm text-grayMuted">
          <Link href="/cadastro" className="text-sm text-primaryPurple hover:text-grayMuted hover:underline">
            <u>Não possui conta? Cadastre-se</u>
          </Link>
        </div>
      </form>
    )
  }

  // desktop
  return (
    <Card className="w-full max-w-md border-0 shadow-none md:border md:border-white/10 md:shadow-sm rounded-2xl bg-primaryBackground">
      <CardHeader className="ml-2">
        <CardTitle className="text-3xl mt-4 text-white">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 flex flex-col items-center" noValidate onSubmit={handleSubmit}>
          <div className="w-[95%] space-y-4">
            {renderFields()}
          </div>
          <div className="flex justify-start w-[95%]">
            <Link href="/recuperar-senha" className="text-sm text-primaryBlue hover:text-grayMuted hover:underline">
              <u>Esqueci minha senha</u>
            </Link>
          </div>
          <Button type="submit" variant="roxo" size="elgdesktop" disabled={isFormIncomplete || isLoading} isLoading={isLoading}>
            FAZER LOGIN
          </Button>
          <div className="text-center text-sm">
            <Link href="/cadastro" className="text-primaryBlue hover:text-grayMuted hover:underline">
              <u>Não possui conta? Cadastre-se</u>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
