import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";
import Wrapper from "@/app/components/Wrap/Wrapper/Wrapper";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<PrivateRoute userRole={100}>
				<main style={{ paddingLeft: "0px" }}>
					<Wrapper maxWidth="1371px">{children}</Wrapper>
				</main>
			</PrivateRoute>
		</>
	);
}
