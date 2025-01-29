import { faUserPlus, faUsers, faList, faLayerGroup, faPenNib, faShoppingCart, faCartPlus,   } from "@fortawesome/free-solid-svg-icons";

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
        name: "Categories",
        className: "navLink",
        path: "categories",
        icon: faList ,
        linkStyle: "LinkStyle",  
        iconStyle: "navIcon",
        role:["1999", "1995"],
    },
    {
        name: "Create Category",
        className: "navLink",
        path: "create_category",
        icon: faLayerGroup ,
        linkStyle: "LinkStyle",  
        iconStyle: "navIcon",
        role:["1999", "1995"],
    },
    {
        name: "Products",
        className: "navLink",
        path: "products",
        icon: faShoppingCart ,
        linkStyle: "LinkStyle",  
        iconStyle: "navIcon",
        role:["1999", "1995"],
    },
    {
        name: "Create Product",
        className: "navLink",
        path: "create_product",
        icon: faCartPlus  ,
        linkStyle: "LinkStyle",  
        iconStyle: "navIcon",
        role:["1999", "1995"],
    },
    {
        name: "Editors",
        className: "navLink",
        path: "editor",
        icon: faPenNib,
        linkStyle: "LinkStyle",  
        iconStyle: "navIcon",
        role:["1996", "1995"],
    },
    

];
