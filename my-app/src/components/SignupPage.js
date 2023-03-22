import './Form.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const jsonData = localStorage.getItem('userJson');
    let users = JSON.parse(jsonData);

    const handleSignup = (e) => {
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
        if (name == '') {
            document.querySelectorAll('.form-message')[2].innerText = 'Fullname không được để trống!';
            error = true;
        } else {
            document.querySelectorAll('.form-message')[2].innerText = '';
            error = true;
        }

        if (!error) {
            let data = users.filter(u => u.email === email);
            if (data.length > 0) {
                alert('Tài khoản đã tồn tại!');
            } else {
                users = [...users, {
                    id: users.length + 1, email, password, name,
                }];
                alert('Đăng ký tài khoản thành công!')
                setEmail('');
                setName('');
                setPassword('');
                localStorage.setItem('userJson', JSON.stringify(users));
            };
        }

    };

    return (
        <div className='main'>
            <form id="form" className="form">
                <h5 className="heading">Đăng ký tài khoản</h5>

                <div className="form-group mt-4">
                    <label htmlFor="email" className="form-label">Email (*)</label>
                    <input id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Nhập Email" className="form-control" />
                    <span className="form-message"></span>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password (*)</label>
                    <input id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Nhập mật khẩu" className="form-control" />
                    <span className="form-message"></span>
                </div>

                <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name (*)</label>
                    <input id="name" name="name" value={name} type="name" onChange={e => setName(e.target.value)} placeholder="Nhập tên đầy đủ" className="form-control" />
                    <span className="form-message"></span>
                </div>

                <div className="row">
                    <div className="col-sm-3 form-group">
                        <label className="form-label">Giới tính</label>
                    </div>
                    <div className="col-sm-5">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" value='male' id="male" />
                            <label className="form-check-label" htmlFor="male">Nam</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" value='female' id="female" />
                            <label className="form-check-label" htmlFor="female">Nữ</label>
                        </div>
                    </div>
                </div>

                <button type="submit" onClick={e => handleSignup(e)} className="form-submit" id="form-submit">Đăng Ký</button>
                <div className="mt-4">
                    <Link to='/login'>
                        Quay lại đăng nhập
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SignupPage;