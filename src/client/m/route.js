export default function(m){
  window.onpopstate = function(){
    m.redraw()
  }
  return (e) => {
    e.preventDefault()
    window.history.pushState(null,document.title,e.target.getAttribute('href'))
  }  
}