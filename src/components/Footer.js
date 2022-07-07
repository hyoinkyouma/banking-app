const Footer = (prop) => {
  return (
    <>
      <footer className="page-footer blue-grey" style={{ width: "100%" }}>
        <div className="container"></div>
        <div className="footer-copyright">
          <div className="container center">
            © 2022 Copyright
            <a
              className="grey-text text-lighten-4 "
              style={{
                display: "grid",
                gridAutoFlow: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50%",
                padding: "0 .3rem",
              }}
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
