import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { NavPanel } from "../NavPanel/NavPanel";
import styles from "./styles.module.css";

export const Layout = ({ children }) => {
	return (
		<div className={styles.root}>
			<Header />
			<div className={styles.content}>
				<NavPanel />
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};


