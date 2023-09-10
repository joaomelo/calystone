import { AppError } from "@lib/errors";

export function validatePassword(password) {
  const code = "PASSWORD_INVALID";

  if (
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 64
  )
    throw new AppError({ code });
}
