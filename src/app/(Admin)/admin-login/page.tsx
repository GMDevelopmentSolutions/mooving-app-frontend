import AdminFormLogin from "@/app/components/AdminFormLogin/AdminFormLogin";

import TextContainer from "@/app/components/TextContainer/TextContainer";

const Login = () => {
	return (
		<>
			<TextContainer
				title="Log in"
				text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus "
			/>

			<AdminFormLogin />
		</>
	);
};

export default Login;
