import './ShowDetail.css';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

const Comments = ({ comments }) => {
    if (comments.length > 0) {
        return (
            comments.map((c, index) => (
                <p key={index}><strong>{c.createByName}:</strong> {c.content} </p>
            ))
        )
    } else {
        return <p>Chưa có bình luận nào</p>
    };
};

const ShowDetail = () => {
    let userData = JSON.parse(localStorage.getItem('userJson'));
    let data = JSON.parse(localStorage.getItem('dataJson'));

    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [moviesData, setMoviesData] = useState(() => {
        let movies = [];
        data.map(c => {
            c.movies.forEach(m => {
                m.type = c.type;
                m.average = (m.comments.reduce((average, c) => (average += c.evaluate), 0)) / (m.comments.length);
            });
            movies = movies.concat(c.movies);
        });
        return movies;
    });
    const [movie, setMovie] = useState({});
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState(userData);

    const [comment, setComment] = useState('');
    const [evaluate, setEvaluate] = useState(0);
    const [changeComment, setChangeComment] = useState(true);

    useEffect(() => {
        let comments = [];
        const movie = moviesData.filter(m => m.id == id)[0];
        comments = movie.comments;
        comments.forEach(c => {
            let commenter = users.find(u => u.id === c.createBy);
            if (user.id === c.createBy) {
                setComment(c.content);
                setEvaluate(c.evaluate);
            };
            c.createByName = commenter.name;
        });
        setMovie(movie);
        setComments(comments);
    }, [changeComment]);

    const handleComment = () => {
        if (user.id) {
            let newComment = {
                content: comment,
                createBy: user.id,
                evaluate: Number(evaluate)
            };
            let indexCategory = data.findIndex(d => d.type === movie.type);
            let indexMovie = data[indexCategory].movies.findIndex(m => m.id == id);
            let indexComment = data[indexCategory].movies[indexMovie].comments.findIndex(c => c.createBy === user.id)
            if (indexComment >= 0) data[indexCategory].movies[indexMovie].comments[indexComment] = newComment;
            else data[indexCategory].movies[indexMovie].comments.push(newComment);

            if (changeComment) setChangeComment(false)
            else setChangeComment(true);
            alert('Đánh giá thành công!')
            localStorage.setItem('dataJson', JSON.stringify(data));
        } else {
            alert('Bạn phải đăng nhập mới có quyền bình luận và đánh giá!');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                    <img src={movie.image} className="img-thumbnail imgDetail" alt="" />
                </div>
                <div className="col-sm-9">
                    <div className="detailMovie">
                        <h2> {movie.title} </h2>
                        <div className='container mt-4'>
                            <p><strong>Thể loại:</strong> {movie.type} </p>
                            <p><strong>Điểm đánh giá:</strong> {movie.average} </p>
                            <p><strong>Mô tả:</strong> {movie.content} </p>
                            <hr />
                            <h3>Chi tiết đánh giá:</h3>
                            <div className='row'>
                                <div className='col-2'>
                                    <strong style={{ height: '40px', alignItems: 'center', display: 'flex' }} >Điểm đánh giá: </strong>
                                </div>
                                <div className='col-2'>
                                    <input type="number" className="form-control" value={evaluate} onChange={e => setEvaluate(e.target.value)} />
                                </div>
                            </div>
                            <p><strong>Bình luận: </strong></p>
                            <textarea value={comment} onInput={e => setComment(e.target.value)} >  </textarea>
                            <button className='btn btn-info' onClick={e => handleComment()}>Đánh giá</button> <br /> <br /> <hr />
                            <h3>Bình luận</h3>
                            <Comments comments={comments} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ShowDetail;