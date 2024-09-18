import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    nome: '',
    senha: '',
    email: ''
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Função de login executada", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors);
    };
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const signup = async () => {
    if (!isValidEmail(formData.email)) {
      alert("Formato de e-mail inválido.");
      return;
    }

    console.log("Função de cadastro executada", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="login-signup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Criar Conta" ? <input name='nome' value={formData.nome} onChange={changeHandler} type="text" placeholder='Nome' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='E-mail' />
          <input name='senha' value={formData.senha} onChange={changeHandler} type="password" placeholder='Senha' />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continuar</button>
        {state === "Criar Conta" ? <p className="loginsignup-login">Já tem uma conta? <span onClick={() => { setState("Login") }}>Entrar</span></p> : <p className="loginsignup-login">Não possui uma conta? <span onClick={() => { setState("Criar Conta") }}>Inscreva-se agora</span></p>}
        <div className="loginsignup-agree">
          <div className="check"><input type="checkbox" /></div>
          <p>Ao continuar, eu aceito os termos de uso &amp; políticas de privacidade.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
