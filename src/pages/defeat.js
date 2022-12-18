import { Link } from "react-router-dom";

export default function Defeat(params) {
    return (
        <div className="principal">
            <div className="row">
                <div className="col-4"> </div>
                <div className="col-4 text-center">
                    <img id="logo" src="https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo-4-1.png" alt="ssss"></img>
                    <Link to="/battle" className="btn btn-outline-secondary btn-lg" >INICIAR NOVO JOGO</Link>
                    <div>
                        <h1>Derrota</h1>
                    </div>
                </div>
                <div className="col-4"> </div>
            </div>
        </div>
    );
}