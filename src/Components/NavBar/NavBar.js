import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const Navigations = [
    {
        label: "Home page",
        value: "home-page"
    },
    {
        label: "Party",
        value: "party-page"
    },
    {
        label: "Items",
        value: "item-page"
    },
    {
        label: "Invoices",
        value: "invoice-page"
    },
    {
        label: "Taxes",
        value: "tax-page"
    },
    {
        label: "Application",
        value: "application-config"
    }
];

function NavBar() {
    let NavItems = Navigations.map(item => {
        let path = '/'+item.value;

        let getClassName = ({ isActive }) => [ isActive ? styles.active : "", styles.sideNavItem ].join(" ")

        return <NavLink key={item.value} to={path} className={getClassName}>{item.label}</NavLink>;
    });

    return (
        <div id="list-container" className={styles.sideNav}>
            {NavItems}
        </div>
    );
}

export default NavBar;