import React, { useState } from "react";
import { ButtonInput, TextInput } from "../components";
import { Card } from "@aws-amplify/ui-react";
import { AiOutlineMail } from "react-icons/ai";

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
      <Card className="py-10 justify-center">
        {!validation && <p className="text-red-700">Sign in error</p>}

        <TextInput
          name={mail}
          icon={<AiOutlineMail />}
          text="Email: "
          type="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMail(e.target.value)
          }
        />
        <TextInput
          name={password}
          icon={<AiOutlineMail />}
          text="Password: "
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <div className="flex items-center justify-between">
          <ButtonInput clickHandler={authHandler} title="Sign in" />
          <ButtonInput clickHandler={newUserHandler} title="Sign up" />
        </div>
      </Card>
    </div>
  );
};
