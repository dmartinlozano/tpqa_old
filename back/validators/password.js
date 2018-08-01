import passwordValidator from 'password-validator';
let schema = new passwordValidator();
schema
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()
  .has().symbols();

export function isValidPassword(password){
  return schema.validate(password);
}
