import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputErrorTooltip } from "./InputError";

export default function LoginForm({ isMobile = false }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const isFormIncomplete = !form.email.trim() || !form.senha;

  const validateLoginForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Email inválido";
    }

    if (!form.senha) {
      newErrors.senha = "Senha é obrigatória";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateLoginForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFields = () => (
    <>
      <div className="space-y-2 relative">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Insira seu email cadastrado"
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
            value={form.senha}
            onChange={handleChange}
            hasError={!!errors.senha}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
          {errors.senha && <InputErrorTooltip message={errors.senha} />}
        </div>
      </div>
    </>
  );

  // 📱 mobile
  if (isMobile) {
    return (
      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        {renderFields()}

        <div className="flex justify-start">
          <Link
            to="/recuperar-senha"
            className="text-sm text-primaryPurple hover:underline"
          >
            Esqueci minha senha
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isFormIncomplete || isLoading}
          isLoading={isLoading}
        >
          FAZER LOGIN
        </Button>

        <div className="text-center text-sm">
          <Link
            to="/cadastro"
            className="text-primaryPurple hover:underline"
          >
            Não possui conta? Cadastre-se
          </Link>
        </div>
      </form>
    );
  }

  // 🖥 desktop
  return (
    <Card className="w-full max-w-md rounded-2xl bg-primaryBackground">
      <CardHeader>
        <CardTitle className="text-3xl text-white">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col items-center"
        >
          <div className="w-[95%] space-y-4">{renderFields()}</div>

          <div className="flex justify-start w-[95%]">
            <Link
              to="/recuperar-senha"
              className="text-sm text-primaryBlue hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isFormIncomplete || isLoading}
            isLoading={isLoading}
          >
            FAZER LOGIN
          </Button>

          <div className="text-center text-sm">
            <Link
              to="/cadastro"
              className="text-primaryBlue hover:underline"
            >
              Não possui conta? Cadastre-se
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
