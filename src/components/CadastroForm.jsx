import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputErrorTooltip } from "./InputError";
import { toast } from 'sonner';

export default function CadastroForm({ isMobile = false }) {
  const navigate = useNavigate();
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    email: "",
    senha: "",
    confirmarSenha: ""
  });

  const isFormIncomplete =
    !form.nome.trim() ||
    !form.empresa.trim() ||
    !form.email.trim() ||
    !form.senha ||
    !form.confirmarSenha;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!form.empresa.trim()) newErrors.empresa = "Empresa é obrigatória";
    if (!form.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Informe um e-mail válido";
    }
    if (!form.senha || form.senha.length < 6)
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
    if (form.confirmarSenha !== form.senha)
      newErrors.confirmarSenha = "As senhas não coincidem";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {

      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("Cadastro realizado com sucesso!");
      

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("Erro no envio:", error);
      toast.error("Erro ao realizar cadastro.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFields = () => (
    <>
      <div className="relative space-y-1">
        <Label htmlFor="nome">Nome Completo</Label>
        <Input
          id="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Como você será identificado."
          className={errors.nome ? "border-red-500" : ""}
        />
        {errors.nome && <InputErrorTooltip message={errors.nome} />}
      </div>

      <div className="relative space-y-1">
        <Label htmlFor="empresa">Empresa</Label>
        <Input
          id="empresa"
          value={form.empresa}
          onChange={handleChange}
          placeholder="Nome da sua empresa."
          className={errors.empresa ? "border-red-500" : ""}
        />
        {errors.empresa && <InputErrorTooltip message={errors.empresa} />}
      </div>

      <div className="relative space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="exemplo@email.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <InputErrorTooltip message={errors.email} />}
      </div>

      <div className="relative space-y-1">
        <Label htmlFor="senha">Senha</Label>
        <div className="relative">
          <Input
            id="senha"
            type={showPassword ? "text" : "password"}
            value={form.senha}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            className={errors.senha ? "border-red-500" : ""}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.senha && <InputErrorTooltip message={errors.senha} />}
      </div>

      <div className="relative space-y-1">
        <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
        <div className="relative">
          <Input
            id="confirmarSenha"
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmarSenha}
            onChange={handleChange}
            className={errors.confirmarSenha ? "border-red-500" : ""}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmarSenha && <InputErrorTooltip message={errors.confirmarSenha} />}
      </div>
    </>
  );

  return (
    <Card className={`w-full max-w-md bg-primaryBackground border-white/10 ${isMobile ? 'border-0 shadow-none' : ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl text-white">Cadastro</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFields()}
          
          <Button 
            type="submit" 
            variant="roxo"
            size="full"
            disabled={isFormIncomplete || isLoading}
          >
            {isLoading ? "Criando conta..." : "CRIAR CONTA"}
          </Button>

          <div className="text-center text-sm text-zinc-400">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Entrar
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}