import React, { useState } from "react";
import { MailInput, PasswordInput } from "../components";

export const Home = () => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div className="h-screen w-full flex items-center justify-center">
      Welcome to the Webtronic Labs POC! Please sign in:
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
    </div>
  );
};
