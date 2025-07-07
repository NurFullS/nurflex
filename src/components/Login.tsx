import React, { useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; server?: string }>({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    const newErrors: { email?: string; password?: string; server?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });
      const user: any = res.data;
      navigate('/', { replace: true });
      localStorage.setItem('userId', user.id.toString())
    } catch (error) {
      setErrors({ server: 'Ошибка входа. Проверьте свой адрес электронной почты или пароль.' });
    }
  };

  return (
    <div>
      <div>
        <input
          type="email"
          placeholder={email}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: undefined, server: undefined }));
          }}
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>

      <div>
        <input
          type="password"
          placeholder={password}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: undefined, server: undefined }));
          }}
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>

      {errors.server && <div style={{ color: 'red', marginTop: 10 }}>{errors.server}</div>}

      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;