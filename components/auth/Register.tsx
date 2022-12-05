import RegisterForm from "components/auth/RegisterForm";
import RegisterSubmit from "components/auth/RegisterSubmit";
import { useRouter } from "next/router";
import { useState } from "react";

import Error from "components/Error";
import sleep from "utils/sleep";

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("1");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);

  const handleSignupClick  = async () => {
    setLoading(true);
    setErrors([]);

    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email,
        password,
      }),
    });

    await sleep(250);

    if (response.ok) {
      const data: Command = await response.json();
      router.push(`/auth/login`);
    } else {
      try {
        const errorResponse = await response.json();
        const errorsObj = {error: errorResponse.message};
        setErrors(Object.values(errorsObj));
      } catch(err) {
        const errorsObj = {error: "Something went wrong.."};
        setErrors(Object.values(errorsObj));
      }
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="flex-grow flex flex-col items-center">
      <RegisterForm
        setEmail={setEmail}
        setPassword={setPassword}
      />
      {errors.length > 0 && <Error errors={errors} />}
      <RegisterSubmit
        handleSignupClick={handleSignupClick}
        loading={loading}
      />
    </div>
  );
};

export default Register;
