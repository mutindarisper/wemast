export const close_nav = () => {
  document.getElementById("mySidenav").style.width = "0px";
  if (screen.width >= 1920)
    document.getElementById("sidenav").style.left = "99.45%";
  if (screen.width < 1920)
    document.getElementById("sidenav").style.left = "99.24%";
  document.getElementById("protrusion").style.right = "-92%";
  Position_Map_controls(null);
};
export const open_nav = () => {
  document.getElementById("sidenav").style.left = null;
  document.getElementById("sidenav").style.left = "100";
  document.getElementById("protrusion").style.right = "94%";

  document.getElementById("mySidenav").style.width = "460px";
  if (screen.width >= 1920) {
    document.getElementById("mySidenav").style.width = "630px";
    document.getElementById("protrusion").style.right = "95.7%";
    Position_Map_controls("640px");
  }
  if (screen.width <= 1024)
    document.getElementById("mySidenav").style.width = "370px";
  if (screen.width > 1024 && screen.width <= 1280)
    document.getElementById("mySidenav").style.width = "430px";
};

export const Position_Map_controls = position => {
  const all = document.getElementsByClassName("leaflet-right");
  for (var i = 0; i < all.length; i++) {
    all[i].style.right = position;
  }
};
