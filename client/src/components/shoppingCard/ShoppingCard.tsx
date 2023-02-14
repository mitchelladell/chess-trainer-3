import "./ShoppingCart.css";
import { Container, Col, Row } from "react-bootstrap";

const ShoppingCard = () => {
  return (
    <Container>
      <Row>
        <Col align="center">
          <div className="cart-texts"> 300 EGP</div>
        </Col>
        <Col></Col>
        <Col>
          <div style={{ width: "100%", display: "flex", height: "100%" }}>
            {" "}
            <div>
              <div style={{ display: "flex" }}>
                <div className="cart-texts">
                  Name OF the course{" "}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="42"
                      height="32"
                      viewBox="0 0 42 32"
                    >
                      <image
                        id="حذفW_من_المشتريات"
                        data-name="حذفW من المشتريات"
                        width="42"
                        height="32"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAYAAABkWOo9AAADAUlEQVRYhdWXTUhVQRTHf8+vKCFTKhC0hREpBoHVIojoA2rRogxaBSVEu3DdpqBFtArcGIQbi2hRG9sZRB8WbSqkqEUlFEUU2pdgkmn9Y2h83Wbu3DfvvbL6wfG9e+bcOeedOXNm5L9C0t+QbZKeK5v3kvaaXOawgc4xFcAzYFmE2w+5XK6hwlPPDVsjgzS8Nn+qPPXcsM/xMgy8S/E8DhzLPzn1uUrSaUkjkqYkvZU0KKlLUtVvqOWFkj4lKtP4aEixy4sbaE7SUUnTGeV9V1Jz2mRFyAFnzouF3nWX3qT4iJf8X1kDXAXWmyIHTgB1nlU2W5zRs5nWSSS1S5rx8hemz/7ag0GLON7ElFNy6fuKdDBt68o4GfNG4zmZFlhaoLNLv91+3rMSYgnQad/bCAwA14A9AftCnCkwnme24X+z380pcN6z+ompx4/26RDQCzQDSz1Lnw1AT0JrWlKHZ5VCLpfLZ9Q4rwdarIRoTOjH7edLK4Xodp77PYsMZjM6mFj+WFYCT4DjwOKId8xq1drvX4AmYMyzSsFkFBtoZ5Gb4JYt9NXeSBwDaZsmJHlss78c6WRSUoekSkk3vdE4doaCSpNkoEbqJA0VcDNhs18tqd8bjWNUUk1aQCFxA8UGcFjSK8fllD3qWq1draSWSOl15uoJBRQSMu6jFXazmF0+CTwEJvwyj9qsI04n6bCtKX6SRHtyMX11EbAZqAZ2eRZx1DtB3i82yFlCgbYB14Eab6Q84i8gDqEbftsfCHIGOOdpIwkFegV45GnLw1wJR0udIbSZsBlttTVaLuYEelFykBmbCXvMPfC0xTEfWAvMK/eXhpbeZQdwA7hkHcdgVuMpMGTvBOZKuKCsaEON1kqTbfjJ02l5ip0rF1LOqVMpdlENPyajbgcwN6Auz8qn3dPAfqDS00YQE6hp0lOOrtaz8nnsaX4sfb2njSUt3Y50S/pql2/c/jOYZpeUdU7JGIZT7Eq6lGTJCkm7JTVm2LiySdIdSZ8l3U5cakoL9J8H+A6soahrq66asgAAAABJRU5ErkJggg=="
                      />
                    </svg>
                  </div>
                </div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "white",
                    margin: "10px",
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </Col>
        <div
          style={{
            borderBottom: "3px solid white",
            margin: "10px",
            width: "95%",
          }}
        >
          {" "}
        </div>
      </Row>
    </Container>
  );
};

export default ShoppingCard;
