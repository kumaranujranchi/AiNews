import menu_data from "@/data/MenuData";
import Link from "next/link.js";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Define MenuItem interface
interface MenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
        mega_dropdown: boolean;
        mega_menus?: {
            link: string;
            title: string;
        }[];
    }[];
}

const NavMenu = () => {
    const [activeMenus, setActiveMenus] = useState<{ [key: string]: boolean }>({});

    const currentRoute = usePathname();

    const isMenuItemActive = (menuLink: string) => {
        return currentRoute === menuLink;
    };

    const isSubMenuItemActive = (subMenuLink: string) => {
        return currentRoute === subMenuLink;
    };

    const toggleMenu = (menuTitle: string) => {
        setActiveMenus((prevActiveMenus) => ({
            ...prevActiveMenus,
            [menuTitle]: !prevActiveMenus[menuTitle],
        }));
    };

    const isMenuActive = (menu: MenuItem) => {
        if (isMenuItemActive(menu.link)) return true;
        if (menu.sub_menus) {
            return menu.sub_menus.some((subMenu) => isSubMenuItemActive(subMenu.link));
        }
        return false;
    };

    return (
        <ul className="navigation">
            {menu_data.map((menu: MenuItem) => (
                <li
                    key={menu.id}
                    className={` ${menu.has_dropdown ? "menu-item-has-children" : ""} ${isMenuActive(menu) ? "active" : ""
                        }`}
                >
                    <Link href={menu.link}>
                        {menu.title}
                    </Link>
                    {menu.has_dropdown && (
                        <div
                            className="dropdown-btn"
                            onClick={() => toggleMenu(menu.title)}
                        >
                            <span className="fas fa-angle-down"></span>
                        </div>
                    )}
                    {menu.has_dropdown && (
                        <ul className={`sub-menu ${activeMenus[menu.title] ? "show" : ""}`}>
                            {menu.sub_menus &&
                                menu.sub_menus.map((subMenu: { link: string; title: string; mega_dropdown: boolean; mega_menus?: { link: string; title: string; }[] | undefined }) => (
                                    <li
                                        key={subMenu.title}
                                        className={`${subMenu.mega_dropdown ? "menu-item-has-children" : ""} ${isSubMenuItemActive(subMenu.link) ? "active" : ""
                                            }`}
                                    >
                                        <Link href={subMenu.link}>
                                            <span>{subMenu.title}</span>
                                        </Link>
                                        {subMenu.mega_dropdown && (
                                            <div
                                                className="dropdown-btn"
                                                onClick={() => toggleMenu(subMenu.title)}
                                            >
                                                <span className="fas fa-angle-down"></span>
                                            </div>
                                        )}
                                        {subMenu.mega_dropdown && (
                                            <ul
                                                className={`sub-menu ${activeMenus[subMenu.title] ? "show" : ""
                                                    }`}
                                            >
                                                {subMenu.mega_menus &&
                                                    subMenu.mega_menus.map((megaMenu: { link: string; title: string }) => (
                                                        <li
                                                            key={megaMenu.title}
                                                            className={`${megaMenu.link &&
                                                                isSubMenuItemActive(megaMenu.link)
                                                                ? "active"
                                                                : ""
                                                                }`}
                                                        >
                                                            <Link href={megaMenu.link}>
                                                                <span>{megaMenu.title}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;