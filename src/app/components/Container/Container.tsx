import styles from "./Container.module.scss";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}
const Container = ({ children, className }: Props) => {
	return <div className={`${className} ${styles.container}`}>{children}</div>;
};

export default Container;
