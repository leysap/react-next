import Link from "next/link"
import "./Navbar.css"
import Image from "next/image"

export default function Navbar() {
    return (
        <div >
            <nav className="navbar">
                <ul className="navbar-menu">
                    <li><Link href='/'><Image src="/images/logo-bildy.png" alt="Logo Bildy" width={100}  height={50}/></Link></li>
                    <li><Link href="/user">Clientes</Link></li>
                    <li><Link href="/user/projects">Proyectos</Link></li>
                    <li><Link  href="/user/deliverynotes">Albaranes</Link></li>
                    <li><Link href="/login" >Sign In</Link></li> 
                    <li><Link href="/register" >Sign Out</Link></li>
                </ul>
            </nav>
        </div>
    )
  
}