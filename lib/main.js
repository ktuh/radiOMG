import '../imports/startup/lib';

AccountsTemplates.configure({
  defaultLayout: 'layout',
  overrideLoginErrors: true,
  showForgotPasswordLink: true,
  enablePasswordChange: false,
  sendVerificationEmail: false,
  confirmPassword: true,
  forbidClientAccountCreation: false,
  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: false,
  defaultContentRegion: 'content'
});

AccountsTemplates.configureRoute('signIn', {
  path: "/ktuhfmlogin"
});
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
