import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Sidebar from "../components/Sidebar/Sidebar/Sidebar";
import Wrapper from "../components/Wrap/Wrapper/Wrapper";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<PrivateRoute userRole={0}>
			<Sidebar />
			<main>
				<Wrapper>{children}</Wrapper>
			</main>
		</PrivateRoute>
	);
}
