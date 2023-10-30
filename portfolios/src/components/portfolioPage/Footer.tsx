import { Container, Row, Col, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="containers">
        <Row className="align-items-center">
          <Col className="text-center text-md-start" size={12} sm={6}>
            <Navbar.Brand className=" fw-bolder fs-1 text-light" href="/">
              PORTFOLIO
            </Navbar.Brand>
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon justify-content-md-end justify-content-center flex-row">
              <a href="https://instagram.com/mv.nuriddin?igshid=OGQ5ZDc2ODk2ZA=="><i className="bi fs-3 m-0 text-warning bi-instagram"></i></a>
              <a href="https://t.me/mv_nuriddin"><i className="bi fs-3 m-0 text-warning bi-telegram"></i></a>
              <a href="https://github.com/maxmutov-nuriddin"><i className="bi fs-3 m-0 text-warning bi-github"></i></a>
            </div>
            <p>Copyright 2023. All Rights Reserved <span className="text-warning">mv_nuriddin</span></p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer