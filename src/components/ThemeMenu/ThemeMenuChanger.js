const ThemeMenuChanger = (props) => {

    let htmlElement = document.documentElement;

    const Violet = () => {
        htmlElement.setAttribute("data-theme", "Violet");
        }
    
    const Indigo = () => {
        htmlElement.setAttribute("data-theme", "Indigo");
        }
      
    const Blue = () => {
        htmlElement.setAttribute("data-theme", "Blue");
        
    }
    
    const Green = () => {
        htmlElement.setAttribute("data-theme", "Green");
        
    }
    
    const Orange = () => {
        htmlElement.setAttribute("data-theme", "Orange");
        
    }
    const Red = () => {
        htmlElement.setAttribute("data-theme", "Red");
        
    }

    const Default = () => {
        htmlElement.setAttribute("data-theme", "light");
        
    }
    return (
    
        <div className={`themeMenuToggle${props.showbox ? " openTheme" : " closed"}`}>
            
            <button aria-label="Violet Theme" onClick={Violet} style={{background: "#9400D3"}} >Violet Theme</button>
          
            <button aria-label=" Indigo Theme" onClick={Indigo} style={{ background: "#4B0082" }} >Indigo Theme</button>
              
            <button aria-label="Blue Theme" onClick={Blue} style={{ background: "#0000FF" }} >Blue Theme</button>
              
            <button aria-label=" Green Theme" onClick={Green} style={{ background: "darkgreen" }} >Green Theme</button>
              
            <button aria-label=" Orange Theme" onClick={Orange} style={{ background: "#FF7F00" }} >Orange Theme</button>
            
            <button aria-label="Red Theme" onClick={Red} style={{ background: "#8b0000" }} >Red Theme</button>
             
            <button aria-label=" Default Theme" onClick={Default} style={{ background: "#283d38" }} >Default Theme</button>
        </div>
        
    )    

}

export default ThemeMenuChanger; 