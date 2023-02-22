import validator from 'is-my-json-valid';

const validateLogin = validator({
  required: true,
  type: 'object',
  properties: {
    email: {
      required: true,
      type: 'string',
    },
    passwort: {
      required: true,
      type: 'string',
    },
  },
});

const validatorRegister = validator(
  {
    required: true,
    type: 'object',
    properties: {
      email: {
        required: true,
        type: 'string',
        // format: 'email',
      },
      passwort: {
        required: true,
        type: 'string',
        // format: 'password',
      },
      name: {
        required: true,
        type: 'string',
      },
    },
  },
  {
    formats: {
      password: /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/, // Minimum 8 Zeichen Minimum eine Nummer & ein buchstabe
      email:
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/,
    },
  },
);

export { validateLogin, validatorRegister };
