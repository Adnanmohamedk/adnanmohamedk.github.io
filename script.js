// NANO 2023, Copyright

//  variables for easy target
const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose"),
      ati = document.getElementById("apple-touch-icon"),
      bico = document.getElementById("32-icon"),
      sico = document.getElementById("16-icon"),
      mfs = document.getElementById("manifest");

      function setfav() {
        if (body.classList.contains("dark")) {
          favdrk();
        }else if(!body.classList.contains("dark")) {
          favlgt();
        }
      }

      function favdrk() {
            ati.setAttribute("href","img-drk/apple-touch-icon.png");
            bico.setAttribute("href","img-drk/favicon-32x32.png");
            sico.setAttribute("href","img-drk/favicon-16x16.png");
            mfs.setAttribute("href","img-drk/site.webmanifest"); 
      }

      function favlgt() {
        ati.setAttribute("href","img/apple-touch-icon.png");
        bico.setAttribute("href","img/favicon-32x32.png");
        sico.setAttribute("href","img/favicon-16x16.png");
        mfs.setAttribute("href","img/site.webmanifest"); 
  }

      let getMode = localStorage.getItem("mode");
      let getFav = localStorage.getItem("fav");
          if(getMode && getMode === "dark-mode"){
            body.classList.add("dark");
          }  
          if (getFav && getFav === "dark") {
            favdrk();
          }

// js code to toggle dark and light mode
      modeToggle.addEventListener("click" , () =>{
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");
        setfav();

        // js code to keep user selected mode even page refresh or file reopen
        if(!body.classList.contains("dark")){
            localStorage.setItem("mode" , "light-mode");
            localStorage.setItem("fav" , "light");
        }else{
            localStorage.setItem("mode" , "dark-mode");
            localStorage.setItem("fav" , "dark");
        }
      });

// js code to toggle search box
        searchToggle.addEventListener("click" , () =>{
        searchToggle.classList.toggle("active");
      });
 
      
//   js code to toggle sidebar
sidebarOpen.addEventListener("click" , () =>{
    nav.classList.add("active");
});

body.addEventListener("click" , e =>{
    let clickedElm = e.target;

    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});
