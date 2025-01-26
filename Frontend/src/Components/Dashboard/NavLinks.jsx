import { faUserPlus, faUsers, faCartShopping  } from "@fortawesome/free-solid-svg-icons";

export const links = [
    {
        name: "Users",
        className: "navLink",
        path: "users",
        icon: faUsers,
        linkStyle: "LinkStyle",  
        iconStyle: "navIcon",
        role:"1995",
    },
    {
        name: "Create User",
        className: "navLink",
        path: "create",
        icon: faUserPlus,
        linkStyle: "LinkStyle",   
        iconStyle: "navIcon",
        role:"1995",
    },
    {
        name: "Products",
        className: "navLink",
        path: "products",
        icon: faCartShopping ,
        linkStyle: "LinkStyle",  
        iconStyle: "navIcon",
        role:["1999", "1995"],
    },
    {
        name: "Editors",
        className: "navLink",
        path: "editor",
        icon: faUserPlus,
        linkStyle: "LinkStyle",  
        iconStyle: "navIcon",
        role:["1996", "1995"],
    },
    

];
