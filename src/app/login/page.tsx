import Login from "@/components/auth/Login";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Login - Zaira CMS",
};

const index = () => {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  )
}

export default index