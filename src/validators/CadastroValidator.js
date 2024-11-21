import * as Yup from 'yup';

const CadastroValidator = Yup.object().shape({
    name: Yup.string()  
      .min(3, 'O mínimo de caracteres é 3')
      .required('Campo obrigatório'),
    password: Yup.string()
      .min(8, 'O mínimo de caracteres é 8')
      .required('Campo obrigatório'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
      .required('Campo obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('Campo obrigatório'),
    username: Yup.string()
      .min(3, 'O mínimo de caracteres é 3')
      .required('Campo obrigatório'),
    birdthdate: Yup.string()
      .required('Campo obrigatório'),
    cpf: Yup.string()
      .min(14, 'Coloque os 11 dígitos do CPF')
      .required('Campo obrigatório')
});

export default CadastroValidator;
