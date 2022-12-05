import LoginForm from "components/auth/LoginForm";
import LoginSubmit from "components/auth/LoginSubmit";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie"

import Error from "components/Error";
import sleep from "utils/sleep";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [cookie, setCookie] = useCookies(["token"])

  const handleTokenLoginClick = async () => {
    setLoading(true);
    setErrors([]);

    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email,
        password,
      }),
    });

    await sleep(150);

    if (response.ok) {
      const data = await response.json();
      const access_token = data.access_token;
      setCookie("token", (data.access_token), {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
      router.push(`/?login=true`);
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
  };

  return (
    <div className="flex-grow flex flex-col items-center">
      <LoginForm
        setEmail={setEmail}
        setPassword={setPassword}
      />
      {errors.length > 0 && <Error errors={errors} />}
      <LoginSubmit
        handleTokenLoginClick={handleTokenLoginClick}
        loading={loading}
      />
    </div>
  );
};

export default Login;
