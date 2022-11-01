var routes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   layout: "/admin",
  // },

  /////////////////////////////////////////////// SIDE LINKS FOR CUSTOMER ///////////////////////////////////////////////////////
  {
    path: "/booking",
    name: "Booking",
    icon: "ni ni-planet text-blue",
    layout: "/admin",
    role: "Customer"
  },
  // {
  //   path: "/customer_profile",
  //   name: "Profile",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   layout: "/admin",
  //   role: "Customer"
  // },
  // {
  //   path: "/customer_settings",
  //   name: "Settings",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   layout: "/admin",
  //   role: "Customer"
  // },
  /////////////////////////////////////////////// SIDE LINKS FOR BUSINESS ///////////////////////////////////////////////////////

  {
    path: "/add_product",
    name: "Add Product",
    icon: "ni ni-bullet-list-67 text-red",
    layout: "/admin",
    role: "BusinessOwner"
  },
  {
    path: "/all_product",
    name: "All Product",
    icon: "ni ni-bullet-list-67 text-red",
    layout: "/admin",
    role: "BusinessOwner"
  },
  // {
  //   path: "/busOwner_profile",
  //   name: "Profile",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   layout: "/admin",
  //   role: "BusinessOwner"
  // },
  {
    path: "/reg_business",
    name: "Register Business",
    icon: "ni ni-bullet-list-67 text-red",
    layout: "/auth",
    role: "BusinessOwner"
  },


  /////////////////////////////////////////////////////////////////////////////////////////////
  {
    path: "/all_business",
    name: "All Business",
    icon: "ni ni-bullet-list-67 text-red",
    layout: "/admin",
    role: "admin"
  },
  {
    path: "/all_business",
    name: "Profile",
    icon: "ni ni-bullet-list-67 text-red",
    layout: "/admin",
    role: "admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   layout: "/admin",
  // },
  // {
  //   path: "/profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   layout: "/admin",
  //   role: ""
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   layout: "/auth",
  // },
];
export default routes;
