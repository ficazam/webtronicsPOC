import React, { useState } from "react";
import { ButtonInput, MailInput, PasswordInput } from "../components";

export const Home = () => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validation, setValidation] = useState<boolean>(true);

  const authHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(mail);
  };

  const newUserHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(mail + "new user");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      Welcome to the Webtronic Labs POC! Please sign in:
      <form className="py-10 justify-center">
        {!validation && <p className="text-red-700">Sign in error</p>}

        <MailInput
          mail={mail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMail(e.target.value)
          }
        />
        <PasswordInput
          pass={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <div className="flex items-center justify-between">
          <ButtonInput clickHandler={authHandler} title="Sign in" />
          <ButtonInput clickHandler={newUserHandler} title="Sign up" />
        </div>
      </form>
    </div>
  );
};
