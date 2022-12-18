import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import Btn from "../components/btn";

export default function Batalha2() {

    const [id, Setid] = useState(1);
    const [pok, Setpok] = useState();
    const [select, Setselect] = useState();
    const [drawn, Setdrawn] = useState();
    const [drawn_temp, Setdrawn_temp] = useState();
    const [select_temp, Setselect_temp] = useState();
    const [danos, Setdanos] = useState(0);
    const navigate = useNavigate();


    function status(pokemon, player) {
        return (
            <div className="card" id="card">
                <img className="card-img-top  img-thumbnail rounded-circle mx-auto d-block mt-3
                " src={pokemon.img} alt="" />
                <div className="card-body">
                    <h2 className="card-title text-center text-capitalize">{pokemon.nome}</h2>
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td>HP</td>
                                <td class="font-weight-bold text-danger">{pokemon.hp}</td>
                            </tr>
                            <tr>
                                <td>Attack</td>
                                <td>{pokemon.ataque}</td>
                            </tr>
                            <tr>
                                <td>Defence</td>
                                <td>{pokemon.defesa}</td>
                            </tr>
                            <tr>
                                <td>Special-attack</td>
                                <td>{pokemon.sp_ataque}</td>
                            </tr>
                            <tr>
                                <td>Special-defence</td>
                                <td>{pokemon.sp_defesa}</td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td>{pokemon.velocidade}</td>
                            </tr>
                        </tbody>
                    </table>
                    {select && <div className="text-center">
                        <Btn class="btn btn btn-outline-secondary" value="Attack" func={attack} name={player}></Btn>
                        <Btn class="btn btn btn-outline-secondary" value="Special-attack" func={att_special} name={player}></Btn>
                    </div>
                    }
                </div>
            </div>
        )
    }

    const attack = async (e) => {
        Setdrawn_temp();
        Setselect_temp();
        let player = e.target.name;
        if (player === "select") {
            let atk = select.ataque
            let def = drawn.defesa
            const danos = dano(atk, def, 150)
            drawn.hp = drawn.hp - danos;
            if (drawn.hp <= 0) {
                Setdanos(0)
                drawn.hp = 0
                Setdrawn(drawn)
                setTimeout(()=>{
                    navigate('/victory')                    
                },3500)
            } else {
                Setdanos(danos)
                Setdrawn_temp(drawn);
            }
        } else if (player === "drawn") {
            let atk = drawn.ataque
            let def = select.defesa
            const danos = dano(atk, def, 150)
            select.hp = select.hp - danos;
            if (select.hp <= 0) {
                Setdanos(0)
                select.hp = 0
                Setselect(select)
                setTimeout(()=>{
                    navigate('/defeat')
                },3500)                
            } else {
                Setdanos(danos)
                Setselect_temp(select);
            }
        }
    }

    function att_special(e) {
        let player = e.target.name;
        if (player === "select") {
            let atk = select.ataque
            let def = drawn.defesa
            const danos = dano(atk, def, 250)
            drawn.hp = drawn.hp - danos;
            if (drawn.hp <= 0) {
                Setdanos(0)
                drawn.hp = 0
                Setdrawn(drawn)
                setTimeout(()=>{
                    navigate('/victory')

                },2000)
            } else {
                Setdanos(danos)
                Setdrawn_temp(drawn);
            }
        } else if (player === "drawn") {
            let atk = drawn.ataque
            let def = select.defesa
            const danos = dano(atk, def, 250)
            select.hp = select.hp - danos;
            if (select.hp <= 0) {
                Setdanos(0)
                select.hp = 0                
                Setselect(select)                
                setTimeout(()=>{
                    navigate('/defeat')
                },2000) 
            } else {
                Setdanos(danos)
                Setselect_temp(select);
            }
        }
    }

    function dano(atk, def, poder) {
        return (Math.round((0.048 * (atk / def) * poder + 2)
            * (1.5 * 1 * 1 * (Math.random() * 0.18 + 0.85).toFixed(2))))
    }

    useEffect(() => {
        let id = Math.floor(Math.random() * 500);
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => { return res.json() })
            .then(result => {
                Setdrawn({
                    nome: result.name,
                    img: result.sprites.front_default,
                    hp: result.stats[0].base_stat,
                    ataque: result.stats[1].base_stat,
                    defesa: result.stats[2].base_stat,
                    sp_ataque: result.stats[3].base_stat,
                    sp_defesa: result.stats[4].base_stat,
                    velocidade: result.stats[5].base_stat
                });
            })
    }, [])

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => { return res.json() })
            .then(result => {
                Setpok({
                    nome: result.name,
                    img: result.sprites.front_default,
                    hp: result.stats[0].base_stat,
                    ataque: result.stats[1].base_stat,
                    defesa: result.stats[2].base_stat,
                    sp_ataque: result.stats[3].base_stat,
                    sp_defesa: result.stats[4].base_stat,
                    velocidade: result.stats[5].base_stat
                })
            });
    }, [id])

    if (!pok) {
        return null
    }

    return (
        <>
            <div className="principal">

                {!select && <div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-3">
                            {pok && status(pok)}
                            <div className="text-center">
                                <button className="btn  btn-outline-light" onClick={() => Setid(id - 1)}>Anterior</button>
                                <button className="btn  btn-outline-light" onClick={() => { Setselect(pok) }}>Selecionar</button>
                                <button className="btn  btn-outline-light" onClick={() => Setid(id + 1)}>Posterior</button>
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>}

                {select && <div>
                    <div className="row">
                        <div className="col-3">{status(select, "select")}</div>
                        <div className="col-6 text-center danos"><h1>Dano causado : <span className="text-danger">{danos}</span></h1></div>
                        <div className="col-3">{status(drawn, "drawn")}</div>
                    </div>
                </div>}
            </div>
        </>
    );
}