'use client';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Paper,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';


const SignupComponent  = () => {
      const router = useRouter();
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
    <Paper elevation={3} sx={{ padding: 4, width: 300, mx: 'auto', mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Signup
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
              margin="normal"
              value={values.email}
              onChange={handleChange}
            />
            <ErrorMessage name="email">
              {msg => <div style={{ color: 'red', fontSize: 12 }}>{msg}</div>}
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
              {msg => <div style={{ color: 'red', fontSize: 12 }}>{msg}</div>}
            </ErrorMessage>

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              margin="normal"
              value={values.confirmPassword}
              onChange={handleChange}
            />
           <ErrorMessage name="confirmPassword">
              {msg => <div style={{ color: 'red', fontSize: 12 }}>{msg}</div>}
            </ErrorMessage>

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Signup
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default SignupComponent;

