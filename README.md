# Pomodoro Web

Uma aplicação web moderna para gestão de tempo e tarefas, utilizando a técnica Pomodoro. Desenvolvida com React, TailwindCSS e Shadcn/UI.

## 🚀 Tecnologias

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/) (Gráficos)
- [Vitest](https://vitest.dev/) (Testes)
- [React Testing Library](https://testing-library.com/)

## 🛠️ Como rodar o projeto

1.  Clone o repositório
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## 🧪 Testes

Este projeto possui uma infraestrutura de testes configurada com **Vitest** e **React Testing Library**.

Para rodar os testes:
```bash
npm run test
```

### Estrutura de Testes
- **Unitários**: `src/lib/utils.test.js` (Testes de utilitários)
- **Integração**: `src/pages/Dashboard/Dashboard.test.jsx` (Testes de componentes e mocks)
- **Interação**: `src/pages/NewProjects/NewProjects.test.jsx` (Testes de formulários e navegação)

## 📂 Estrutura de Pastas Importante

- `src/components`: Componentes reutilizáveis
- `src/pages`: Páginas da aplicação
- `src/mocks`: Dados simulados (Mock Data) para desenvolvimento sem backend
- `src/lib`: Utilitários gerais
- `src/test`: Configurações de teste
