import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './ShowMovies.css';

const Movies = ({ movies }) => {
    const navigate = useNavigate();
    return (
        <div className='movies'>
            <div className='row'>
                {movies.map((m, index) => (
                    <div className='col-lg-3 col-sm-4' key={index}>
                        <div className="card">
                            <img src={m.image} className="card-img-top img-thumbnail" alt={m.title} />
                            <div className="card-body">
                                <div className="card-title text-truncate h5">{m.title}</div>
                                <span className="card-text">Năm: {m.year}</span> <br />
                                <span className="card-text">Thể loại: {m.type}</span> <br />
                                <span className="card-text">Điểm: {m.average}</span> <br />
                                <div className='btn btn-info mt-2' onClick={() => navigate(`/showdetail/${m.id}`)} >Đánh giá</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

const ShowMovies = () => {
    const jsonData = localStorage.getItem('dataJson');
    let data = JSON.parse(jsonData);

    const { moviesData, setMoviesData } = useContext(UserContext);
    const [categorys, setCategorys] = useState(data);
    const [movies, setMovies] = useState([]);
    const [moviesByCategory, setMoviesByCategory] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(0);

    useEffect(() => {
        if (currentCategory === 0) {
            let movies = [];
            categorys.map(c => {
                c.movies.forEach(m => {
                    m.type = c.type;
                    m.average = (m.comments.reduce((average, c) => (average += c.evaluate), 0)) / (m.comments.length);
                });
                movies = movies.concat(c.movies);
            });
            setMovies(movies);
            setMoviesByCategory(movies);
        } else {
            let movies = [];
            let category = categorys.find(c => c.id === currentCategory);
            category.movies.forEach(m => {
                m.type = category.type;
                m.average = (m.comments.reduce((average, c) => (average += c.evaluate), 0)) / (m.comments.length);
            });
            movies = movies.concat(category.movies);
            setMovies(movies);
            setMoviesByCategory(movies);
        };
    }, [currentCategory]);

    useEffect(() => {
        let movies = [];
        categorys.map(c => {
            c.movies.forEach(m => {
                m.type = c.type;
                m.average = (m.comments.reduce((average, c) => (average += c.evaluate), 0)) / (m.comments.length);
            });
            movies = movies.concat(c.movies);
        });
        setMoviesData(movies);
        // localStorage.setItem('userJson', JSON.stringify(user));
        // localStorage.setItem('dataJson', JSON.stringify(data));
    }, []);

    const handleSearch = (e) => {
        let value = e.target.value;
        const moviesSearch = moviesByCategory.filter(p => p.title.toUpperCase().includes(value.toUpperCase()));
        setMovies(moviesSearch);
    };

    const handleSort = (e) => {
        let value = e.target.value;
        let sortCriteria;
        switch (value) {
            case '1':
                sortCriteria = (a, b) => a.id - b.id;
                break;
            case '2':
                sortCriteria = (a, b) => b.id - a.id;
                break;
            case '3':
                sortCriteria = (a, b) => a.title.localeCompare(b.title);
                break;
            case '4':
                sortCriteria = (a, b) => b.title.localeCompare(a.title);
                break;
            case '5':
                sortCriteria = (a, b) => a.year - b.year;
                break;
            case '6':
                sortCriteria = (a, b) => b.year - a.year;
                break;
            default:
                break;
        };

        const movieSort = movies.sort((a, b) => sortCriteria(a, b));
        setMovies([...movieSort]);
    };

    let category = document.querySelectorAll('.category');
    useEffect(() => {
        if (category[0]) {
            category.forEach(s => {
                s.addEventListener('click', e => {
                    category.forEach(s => {
                        s.classList.remove('choose');
                    });
                    e.target.classList.add('choose');
                });
            })
        }
    }, [category]);

    return (
        <div className='container showMovies'>
            <div className='row'>
                <div className='col-lg-2 col-sm-3'>
                    <div className='categorys'>
                        <div className='categoryTitle'>Thể loại</div>
                        <div className='category choose' onClick={() => setCurrentCategory(0)} >Tất cả</div>
                        {categorys.map(c => <div className='category' onClick={() => setCurrentCategory(c.id)} key={c.id} > {c.type} </div>)}
                    </div>
                </div>
                <div className='col-lg-10 col-sm-9'>
                    <div className='header'>
                        <div className='row'>
                            <div className='col-6'></div>
                            <div className='col-3'>
                                <input type="text" className='form-control' onInput={e => handleSearch(e)} placeholder='Enter name to search' />
                            </div>
                            <div className='col-3'>
                                <select className="form-select" onChange={e => handleSort(e)}>
                                    <option value='1'>Sắp xếp theo Id +</option>
                                    <option value='2'>Sắp xếp theo Id -</option>
                                    <option value='3'>Sắp xếp theo tên +</option>
                                    <option value='4'>Sắp xếp theo tên -</option>
                                    <option value='5'>Sắp xếp theo năm +</option>
                                    <option value='6'>Sắp xếp theo năm -</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <Movies movies={movies} />
                </div>
            </div>
        </div>
    )
};

export default ShowMovies;