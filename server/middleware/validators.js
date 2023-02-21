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

export { validateLogin };
