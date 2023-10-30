import { SetStateAction, useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap"

const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value: SetStateAction<string>) => {
    setActiveLink(value);
  }

  return (
    <>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Navbar.Brand className=" fw-bolder fs-1 text-light" href="/">
          PORTFOLIO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-3">
            <Nav.Link href="/" className={activeLink === 'panel' ? 'navbar-link text-info ' : 'navbar-link text-light '}>Panel</Nav.Link>
            <Nav.Link href="#home" className={activeLink === 'home' ? 'navbar-link text-info ' : 'navbar-link text-light '} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#skills" className={activeLink === 'skills' ? 'navbar-link text-info ' : 'navbar-link text-light '} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
            <Nav.Link href="#projects" className={activeLink === 'projects' ? 'navbar-link text-info ' : 'navbar-link text-light '} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a className="social-icon-link" target="_blank" href="https://instagram.com/mv.nuriddin?igshid=OGQ5ZDc2ODk2ZA==">
                <i className="bi fs-3 m-0 text-warning bi-instagram"></i>
              </a>
              <a className="social-icon-link" target="_blank" href="https://t.me/mv_nuriddin"><i className="bi fs-3 m-0 text-warning bi-telegram"></i></a>
              <a className="social-icon-link" target="_blank" href="https://github.com/maxmutov-nuriddin"><i className="bi fs-3 m-0 text-warning bi-github"></i></a>
            </div>
          </span>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBar