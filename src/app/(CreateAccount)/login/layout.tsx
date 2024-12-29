import SideImg from "../../components/SideImg/SideImg";
import Wrapper from "../../components/Wrap/Wrapper/Wrapper";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SideImg />
      <main style={{}}>
        <Wrapper background="var(--default-background)">{children}</Wrapper>
      </main>
    </>
  );
}
