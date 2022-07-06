const Footer = (prop) => {
  return (
    <>
      <footer
        className="page-footer blue-grey"
        style={{ position: prop.posY, bottom: "0", width: "100%" }}
      >
        <div className="container">
          <div className="row"></div>
        </div>
        <div className="footer-copyright">
          <div
            className="container center"
            style={{
              display: "grid",
              gridAutoFlow: "column",
            }}
          >
            © 2014 Copyright
            <a
              className="grey-text text-lighten-4 "
              style={{ padding: "0 .3rem" }}
              href="https://romanaugusto.tk"
            >
              Roman Cabalum
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
