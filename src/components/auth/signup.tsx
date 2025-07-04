'use client';

import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const SignupComponent = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  const handleSignup = (values: typeof initialValues) => {
    console.log('Signup successful', values);
    router.push('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #283e51, #485563)',
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: isMobile ? '100%' : 400,
          p: 4,
          borderRadius: 3,
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
          Create an Account
        </Typography>

        <Typography variant="body2" align="center" color="textSecondary" mb={3}>
          Sign up to get started
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ handleChange, values }) => (
            <Form>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                margin="normal"
                variant="outlined"
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
                margin="normal"
                variant="outlined"
                value={values.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
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

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                margin="normal"
                variant="outlined"
                value={values.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage name="confirmPassword">
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
                Signup
              </Button>
            </Form>
          )}
        </Formik>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Already have an account?{' '}
            <MuiLink
              component="button"
              variant="body2"
              onClick={() => router.push('/login')}
              sx={{
                color: '#0d6efd',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignupComponent;
