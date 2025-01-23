import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

export const links = [
    {
        name: "Users",
        className: "navLink",
        path: "users",
        icon: faUsers,
        linkStyle: "LinkStyle",   // Fixed property name
        iconStyle: "navIcon",
        role:"1995",
    },
    {
        name: "Create User",
        className: "navLink",
        path: "create",
        icon: faUserPlus,
        linkStyle: "LinkStyle",   // Fixed property name
        iconStyle: "navIcon",
        role:"1995",
    },
    {
        name: "Editors",
        className: "navLink",
        path: "editor",
        icon: faUserPlus,
        linkStyle: "LinkStyle",   // Fixed property name
        iconStyle: "navIcon",
        role:["1996", "1995"],
    }
];
