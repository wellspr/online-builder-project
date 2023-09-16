import Logo from "~/images/Logo";
import cog from "../images/cog.svg";

const Header = () => {

    return (
        <header className="header">
            <h1 className="brand">
                {/* <img className="brand__image" src={cog} alt="logo" height="50px" /> */}
                <Logo />
                <span className="brand__text">Esbuild App</span>
            </h1>
        </header>
    );
};

export default Header;