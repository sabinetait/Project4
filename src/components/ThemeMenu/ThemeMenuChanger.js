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
            
            <button onClick={Violet} style={{background: "#9400D3"}} >Violet Theme</button>
          
            <button onClick={Indigo} style={{ background: "#4B0082" }} >Indigo Theme</button>
              
            <button onClick={Blue} style={{ background: "#0000FF" }} >Blue Theme</button>
              
            <button onClick={Green} style={{ background: "darkgreen" }} >Green Theme</button>
              
            <button onClick={Orange} style={{ background: "#FF7F00" }} >Orange Theme</button>
            
            <button onClick={Red} style={{ background: "#8b0000" }} >Red Theme</button>
             
            <button onClick={Default} style={{ background: "#283d38" }} >Default Theme</button>
        </div>
        
    )    

}

export default ThemeMenuChanger; 