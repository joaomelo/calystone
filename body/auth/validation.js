import { AppError } from "../../lib";

export const AUTH_ERRORS = {
  EMAIL_INVALID: "AUTH_ERRORS.EMAIL_INVALID",
  PASSWORD_INVALID: "AUTH_ERRORS.PASSWORD_INVALID",
};

export function validateEmail(email) {
  if (!email || typeof email !== "string")
    throw new AppError({ code: AUTH_ERRORS.EMAIL_INVALID });

  const emailParts = email.split("@");
  if (emailParts.length !== 2)
    throw new AppError({ code: AUTH_ERRORS.EMAIL_INVALID });

  const account = emailParts[0];
  if (account.length > 64)
    throw new AppError({ code: AUTH_ERRORS.EMAIL_INVALID });

  const address = emailParts[1];
  if (address.length > 255)
    throw new AppError({ code: AUTH_ERRORS.EMAIL_INVALID });

  const domainParts = address.split(".");
  if (domainParts.some((part) => part.length > 63))
    throw new AppError({ code: AUTH_ERRORS.EMAIL_INVALID });

  const tester =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!tester.test(email))
    throw new AppError({ code: AUTH_ERRORS.EMAIL_INVALID });
}

export function validatePassword(password) {
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 64
  )
    throw new AppError({ code: AUTH_ERRORS.PASSWORD_INVALID });
}
