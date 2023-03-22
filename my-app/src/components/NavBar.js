import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './NavBar.css';

const Authentication = () => {
    const { user, setUser } = useContext(UserContext);

    const logout = () => {
        if (window.confirm('Bạn muốn đăng xuất khỏi hệ thống!')) {
            setUser({});
            alert('Đăng xuất thành công!')
        };
    };

    if (user.id) {
        return (
            <div style={{ cursor: 'pointer' }} onClick={() => logout()} >
                Signed in as: {user.name}
            </div>
        )
    } else {
        return (
            <Link to='/login'>
                <button className="btn btn-outline-info">Login</button>
            </Link>
        )
    }
};

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/'>
                                <div className='nav-link active'>Trang chủ</div>
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button> */}
                        <Authentication />
                    </form>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;