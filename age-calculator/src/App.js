import { Answer } from "./components/Answer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { find } from "./repository/AnswerRepository";

function App() {
  const [person, setPerson] = useState({
    image:
      "",
    name: "",
    age: "",
  });

  const myFunction = async () => {
    const result = await find();
    console.log(result);
    setPerson(result);
  };

  useEffect(() => {
    myFunction();
  }, []);

  return (
    <div className="App">
      <Container>
        <Row>
          <h1>How old is he/she?</h1>
        </Row>
        <Row>
          <img data-testid="personImage" src={person.image} alt="Foto" />
        </Row>

        <Answer {...person} />
      </Container>
    </div>
  );
}

export default App;
