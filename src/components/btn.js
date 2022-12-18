export default function Btn (props){



    return(
        <>
        <button className={props.class} onClick={props.func} name={props.name}>{props.value}</button>
        </>
    );
}