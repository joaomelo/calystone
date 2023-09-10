import { AppError } from "@lib/errors";

export function validateEmail(email) {
  const code = "EMAIL_INVALID";

  if (!email || typeof email !== "string") throw new AppError({ code });

  const emailParts = email.split("@");
  if (emailParts.length !== 2) throw new AppError({ code });

  const account = emailParts[0];
  if (account.length > 64) throw new AppError({ code });

  const address = emailParts[1];
  if (address.length > 255) throw new AppError({ code });

  const domainParts = address.split(".");
  if (domainParts.some((part) => part.length > 63))
    throw new AppError({ code });

  const tester =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!tester.test(email)) throw new AppError({ code });
}
