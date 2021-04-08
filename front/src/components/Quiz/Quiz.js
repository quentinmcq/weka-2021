import './Quiz.css';
import {useState, useEffect} from "react";
import axios from "axios";
import DropdownFilter from "../Dropdown/Dropdown";
import {Link} from "@reach/router";
import {Container} from "react-bootstrap";

export default function Quiz() {
    const [searchTerm, setSearchTerm] = useState('');
    const [quizzes, setQuizzes] = useState([]);

    async function getQuiz() {
        let quiz = [];

        try {
            quiz = (await axios.get('/quiz')).data;
        } catch (err) {
            alert(err);
        } finally {
            setQuizzes(quiz);
        }
    }

    async function deleteQuiz(id) {
        try {
            console.log(id)
            await axios.delete(`delete_quiz/${id}`);
        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        getQuiz();
    }, []);

    function quizId(id) {
        test = id;
    }

    const displayQuizzes = quizzes
        .filter((item) => searchTerm ? item.theme === searchTerm : true)
        .map((item, index) => (
            <>
                <div key={index}>
                    <h2 className="font-weight-bold mt-5">Quiz n°{item.quiz_id}</h2>
                    <h3 className="font-italic" style={{textDecoration: 'underline'}}>Thème :
                        <span> {item.theme}</span>
                    </h3>

                    <Link to={`/quiz/${item.quiz_id}`}>
                        <img
                            src={item.image}
                            alt="img-quiz"
                            style={{borderRadius: '5px'}}
                        />
                    </Link>

                    <div className="mt-2">
                        <button
                            className="btn btn-danger mr-3"
                            onClick={() => deleteQuiz(item.quiz_id)}
                        >
                            Supprimer le quiz
                        </button>
                    </div>

                    <Link
                        to='/question/create'
                        className="btn btn-primary"
                        onClick={() => quizId(item.quiz_id)}
                    >Créer une question</Link>
                </div>
            </>
        ));

    return (
        <Container className="text-center">
            <DropdownFilter
                quizThemes={quizzes}
                setSelected={setSearchTerm}
            />

            <div>{displayQuizzes}</div>
        </Container>
    )
}

export let test;