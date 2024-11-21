import * as Yup from 'yup';

const ClienteValidator = Yup.object().shape({
    nome: Yup.string()  
      .min(3, 'O mínimo de caracteres é 3')
      .required('Campo obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('Campo obrigatório'),
    telefone: Yup.string()
      .min(11, 'O mínimo de caracteres é 11')
      .required('Campo obrigatório'),
    data_nascimento: Yup.string()
      .required('Campo obrigatório'),
    cpf: Yup.string()
      .min(14, 'Coloque os 11 dígitos do CPF')
      .required('Campo obrigatório')
});

export default ClienteValidator;
