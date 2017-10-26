import '../imports/startup/lib';

AccountsTemplates.configure({
  defaultLayout: 'atLayout',
  overrideLoginErrors: true,
  showForgotPasswordLink: true,
  enablePasswordChange: false,
  sendVerificationEmail: false,
  confirmPassword: true,
  forbidClientAccountCreation: false,
  negativeValidation: true,
  positiveValidation:true,
  negativeFeedback: false,
  positiveFeedback:false
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin'
});
AccountsTemplates.configureRoute('signUp', {
  name: 'join',
  path: '/join'
});
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password'
});
