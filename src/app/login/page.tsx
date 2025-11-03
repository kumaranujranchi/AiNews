import Login from "@/components/auth/Login";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Login - Zaira News Magazine",
};

const LoginPage = () => {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  )
}

export default LoginPage