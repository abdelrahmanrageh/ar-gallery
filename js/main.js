let span = document.getElementById("top");

window.onscroll = function() {
    
    // console.log(this.scrollY);
    
    if (this.scrollY >= 745) {

        document.getElementById("top").classList.add("show");
    } 
    else {
        document.getElementById("top").classList.remove("show to school");
    }
}