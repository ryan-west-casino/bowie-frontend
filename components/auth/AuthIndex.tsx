import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/react-fontawesome";

const AuthIndex = () => {
        return (
                    <div className="flex-grow py-24 flex flex-col gap-12 justify-between items-center">
                    <Link href="/auth/login">
                        <div className="card bg-base-300 w-[32rem] text-base-content">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <FontAwesomeIcon icon={faUser} className="text-primary"/>
                                    Login
                                </h2>
                                <p>Login to your existing account.</p>
                                <p className="ml-auto">/auth/login</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/auth/register">
                        <div className="card bg-base-300 w-[32rem] text-base-content">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <FontAwesomeIcon icon={faUserPlus} className="text-primary"/>
                                    Register
                                </h2>
                                <p>Register a new account.</p>
                                <p className="ml-auto">/auth/register</p>
                            </div>
                        </div>
                    </Link>
                    </div>
                );
    };

    export default AuthIndex;
