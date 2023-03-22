import './Form.css';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const jsonData = localStorage.getItem('userJson');
    let users = JSON.parse(jsonData);

    const handleLogin = (e) => {
        e.preventDefault();
        let error = false;
        if (email == '') {
            document.querySelectorAll('.form-message')[0].innerText = 'Email không được để trống!';
            error = true;
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.querySelectorAll('.form-message')[0].innerText = 'Trường này phải là email!';
            error = true;
        } else {
            document.querySelectorAll('.form-message')[0].innerText = '';
        }
        if (password == '') {
            document.querySelectorAll('.form-message')[1].innerText = 'Password không được để trống!';
            error = true;
        } else if (password.length < 6) {
            document.querySelectorAll('.form-message')[1].innerText = 'Password phải lớn hơn 6 ký tự!';
            error = true;
        } else {
            document.querySelectorAll('.form-message')[1].innerText = '';
        };
        if (!error) {
            const user = users.filter(u => u.password === password && u.email === email)[0];
            if (user) {
                setUser(user);
                navigate('/');
            } else {
                alert('Tài khoản hoặc mật khẩu không đúng!');
            };
        };
    };

    return (
        <div className='main'>
            <form id="form" className="form">
                <h5 className="heading">Đăng nhập</h5>

                <div className="form-group mt-4">
                    <label htmlFor="email" className="form-label">Email (*)</label>
                    <input id="email" name="email" type="text" placeholder="Nhập Email" onChange={e => setEmail(e.target.value)} className="form-control" />
                    <span className="form-message"></span>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password (*)</label>
                    <input id="password" name="password" type="password" placeholder="Nhập mật khẩu" onChange={e => setPassword(e.target.value)} className="form-control" />
                    <span className="form-message"></span>
                </div>

                <button type="submit" className="form-submit" id="form-submit" onClick={e => handleLogin(e)} >Đăng nhập</button>
                <div className="mt-4"></div>
                <div className="row">
                    <div className="col-6 col-lg-6">
                        <a href="">Quên mật khẩu</a>
                    </div>
                    <div className="col-6 col-lg-6">
                        <Link to='/signup'>
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;