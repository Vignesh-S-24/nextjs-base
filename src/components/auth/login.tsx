'use client';
import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Typography,
  Paper,
  TextField,
  Box,
  Link as MuiLink,
} from '@mui/material';

const LoginComponent = () => {
  const router = useRouter();

  const initialValues = {
    email: 'admin@example.com',
    password: 'password',
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
    <Paper elevation={3} sx={{ padding: 4, width: 300, mx: 'auto', mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, values }: any) => (
          <Form>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              value={values.email}
              onChange={handleChange}
            />
            <ErrorMessage name="email">
              {(msg) => <div style={{ color: 'red', fontSize: 12 }}>{msg}</div>}
            </ErrorMessage>

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={values.password}
              onChange={handleChange}
            />
            <ErrorMessage name="password">
              {(msg) => <div style={{ color: 'red', fontSize: 12 }}>{msg}</div>}
            </ErrorMessage>

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </Form>
        )}
      </Formik>

      {/* Signup link */}
      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Don't have an account?{' '}
          <MuiLink
            component="button"
            variant="body2"
            onClick={() => router.push('/signup')}
            sx={{ textTransform: 'none' }}
          >
            Sign up
          </MuiLink>
        </Typography>
      </Box>
    </Paper>
  );
};

export default LoginComponent;
