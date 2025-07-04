'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Link as MuiLink,
  useMediaQuery,
  useTheme,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const LoginComponent = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: 'admin@example.com',  // Default email
    password: 'password',        // Default password
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleLogin = (values: typeof initialValues) => {
    const { email, password } = values;
    if (email === 'admin@example.com' && password === 'password') {
      console.log('Login successful');
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: isMobile ? '100%' : 380,
          p: 4,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ color: '#062144' }}
        >
          Welcome Back 👋
        </Typography>

        <Typography variant="body2" align="center" color="textSecondary" mb={3}>
          Please enter your login credentials
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, values }) => (
            <Form>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                value={values.email}
                onChange={handleChange}
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <Typography color="error" fontSize={12}>
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                value={values.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage name="password">
                {(msg) => (
                  <Typography color="error" fontSize={12}>
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  backgroundColor: '#062144',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#04162f',
                  },
                }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Don&apos;t have an account?{' '}
            <MuiLink
              component="button"
              variant="body2"
              onClick={() => router.push('/signup')}
              sx={{
                color: '#0d6efd',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Sign up
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginComponent;
