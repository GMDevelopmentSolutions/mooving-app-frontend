import FormLogin from "../../components/formLogin/formLogin";
import AuthOptions from "@/app/components/AuthOptions/AuthOptions";
import CreateHeader from "@/app/components/CreateHeader/CreateHeader";
import CustomLink from "@/app/components/CustomLink/CustomLink";
import TextContainer from "@/app/components/TextContainer/TextContainer";

const Login = () => {
	return (
		<>
			<CreateHeader>
				<AuthOptions>
					<CustomLink href={"/signUp"}>Sign up</CustomLink>
				</AuthOptions>
			</CreateHeader>

			<TextContainer
				title="Log in"
				text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus "
			/>

			<FormLogin />
		</>
	);
};

export default Login;
