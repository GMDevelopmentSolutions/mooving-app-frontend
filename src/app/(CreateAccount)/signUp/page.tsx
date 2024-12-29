import FormSingIn from "@/app/components/formSingIn/formSingIn";
import CreateHeader from "@/app/components/CreateHeader/CreateHeader";
import AuthOptions from "@/app/components/AuthOptions/AuthOptions";
import CustomLink from "@/app/components/CustomLink/CustomLink";
import TextContainer from "@/app/components/TextContainer/TextContainer";

const SingIn = () => {
	return (
		<>
			<CreateHeader>
				<AuthOptions>
					<CustomLink href={"/login"}>Log in</CustomLink>
				</AuthOptions>
			</CreateHeader>

			<TextContainer
				title="Sign in"
				text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus "
			/>

			<FormSingIn />
		</>
	);
};

export default SingIn;
