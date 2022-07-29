import { Answer } from "./components/Answer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <h1>How old is he/she?</h1>
        </Row>
        <Row>
          <img
            data-testid="personImage"
            src="https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/social_share_large/public/Purina%C2%AE%20La%20llegada%20del%20gatito%20a%20casa.jpg?itok=_3VnSPSl"
            alt="Foto"
          />
        </Row>
        
        <Answer />
      </Container>
    </div>
  );
}

export default App;
