import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe("Login Component", () => {
  
  test("Deve Renderizar Corretamente", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  test("Deve Encontrar todos os elementos do Formulario na tela de Login", () => {
    render(<App />);
    const buttonEntrar = screen.queryByText("Entrar");
    const passwordInput = screen.queryByText("Senha:");
    const emailInput = screen.queryByText("Email:");

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(buttonEntrar).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test("Deve Fazer Login sem dados e capturar a mensagem de erro", async () => {
    render(<App />);
    const buttonSubmit = screen.queryByText("Entrar");

    userEvent.click(buttonSubmit);
    
    const messageError = await screen.findByText("Email ou senha em formato incorreto.");
    
    expect(buttonSubmit).toBeInTheDocument();
    expect(messageError).toBeInTheDocument();
  });

  test("Deve Fazer Login com dados vãlidos e incorretos para capturar a mensagem de erro", async () => {
    render(<App />);

    const passwordInput = screen.queryByText("Senha:");
    const emailInput = screen.queryByText("Email:");

    userEvent.type(passwordInput, "@@!!123Soft");
    userEvent.type(emailInput, "chablau@gmail.com");

    const buttonSubmit = screen.queryByText("Entrar");
    
    userEvent.click(buttonSubmit);
    
    const messageError = await screen.findByText("Usuário ou senha incorretos.");
    expect(messageError).toBeInTheDocument();
  });

});