module.exports = {
  //succes-codes
  successOk: 200,
  successCreated: 201,
  successAccepted: 202,
  successMessage: "Success",
  //country-error
  countryServiceErr: 400,
  countryServiceErrHttp: 400,
  countryServiceErrMessage: "Service not available in your country",
  //database-error
  dbErrHttpCode: 500,
  dbErrCode: 500,
  dbErrMessage: "Database error.",
  //not-found-error
  notFoundHttpCode: 404,
  notFoundCode: 404,
  notFoundMessage: "Not Found",
  //user-not-found
  notFoundUserCode: 401,
  notFoundUserHttpCode: 401,
  notFoundUserMessage: "User doesn't exist",
  //bad-request
  badRequestHttpCode: 400,
  badRequestCode: 400,
  badRequestMessage: "Bad Request",
  //service-unavailble
  serviceUnavailableCode: 503,
  serviceUnavailableHttpCode: 503,
  serviceUnavailableMessage: "Service not available",
  //validation-error
  validationErrCode: 400,
  validationErrHttpCode: 400,
  //OTP-Err
  incorrectOtp: "Incorrect otp.",
  emailNotFound: "Email not registered with us",
  incorrectPass: "Incorrect Password",
  invalidEmailAndPass: "Invalid Credentials ",
  detailsNotFound: "Empty Fields",
  passwordNotMatched: "New Password and Re-Password Are Not Matched",
  oldAndNewPassSame: "Old Password And New Password Should't Be Same",
  emailExistErr: "Email already exists.",
  phoneExistErr: "Phone already exists.",
  uploadErr: "Upload Error, Please Try again.",
  passcodeErr: "Please enter correct otp.",
  noDataErr: "No Data exists.",
  paymentFailed: "Payment Failed!",
  invalidTokenHttpCode: 400,
  invalidTokenCode: 400,
  invalidTokenMessage: "Please Login Again",
};
