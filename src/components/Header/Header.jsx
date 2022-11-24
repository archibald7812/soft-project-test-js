import styles from "./styles.module.css";
import classnames from "classnames";
import Logo from "./img/logo.svg";

export const Header = () => {
	return (
		<div className={classnames(styles.root)}>
			<img alt='Soft Project' src={Logo} loading='lazy'></img>
		</div>
	)
}