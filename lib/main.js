import '../imports/startup/lib';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

AccountsTemplates.configure({
  defaultLayout: 'layout',
  overrideLoginErrors: true,
  showForgotPasswordLink: true,
  enablePasswordChange: true,
  sendVerificationEmail: true,
  confirmPassword: true,
  forbidClientAccountCreation: false,
  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: false,
  defaultContentRegion: 'content'
});

AccountsTemplates.configureRoute('signIn', {
  path: '/ktuhfmlogin'
});
AccountsTemplates.configureRoute('signUp');
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: 'username',
    type: 'text',
    displayName: 'username',
    required: true,
    minLength: 5,
  },
  {
    _id: 'email',
    type: 'email',
    required: true,
    displayName: 'email',
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'Invalid email',
  },
  pwd
]);
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
