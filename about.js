const body = document.body;
const stickyFooter = document.getElementById("sticky-footer");
const navbar = document.querySelector(".navbar");


$('#changeMode').click(function () {
  body.classList.toggle("dark-mode");
  stickyFooter.classList.toggle("dark-mode");
  navbar.classList.toggle("dark-mode");
});
