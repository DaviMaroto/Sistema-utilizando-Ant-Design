import React from "react";
import "./Footer.css"
import facebook from "../assets/facebook.png"
import instagram from "../assets/instagram.png"
const Footer = () => {
  return (
    <div className="footer">
        <div className="sb__footer section__padding">
            <div className="sb__footer-links">
               
                <div className="sb__footer-links_div">
                    <h4>Insigth Lab</h4>
                    <a href="#">
                        <p>Início</p>
                    </a>
                    <a href="#">
                        <p>Sobre</p>
                    </a>
                    <a href="#">
                        <p>Blog</p>
                    </a>
                </div>
                <div className="sb__footer-links_div">
                    <h4>Carreira</h4>
                    <a href="#">
                        <p>Lorem</p>
                    </a>
                </div>
                <div className="sb__footer-links_div">
                    <h4>Serviços</h4>
                    <a href="#">
                        <p>Lorem</p>
                    </a>
                    <a href="#">
                        <p>Lorem</p>
                    </a>
                    <a href="#">
                        <p>Lorem</p>
                    </a>
                </div>
                <div className="sb__footer-links_div">
                    <h4>Siga-nos</h4>
                    <div className="socialmedia">
                        <p><img src={facebook} alt="" /></p>
                        <p><img src={instagram} alt="" /></p>
                        
                    </div>
                </div>
            </div>
            
            <div className="sb__footer-bellow">
                    <div className="sb__footer-copyright">
                        <p>
                            {new Date().getFullYear()} &copy; Desenvolvido Por Davi
                        </p>
                    </div>
                    
            </div>
        </div>
    </div>
    
  )
}

export default Footer