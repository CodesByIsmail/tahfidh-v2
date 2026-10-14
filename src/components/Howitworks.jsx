function Howitworks({ number, title, text }) {
    return (
        <div className="howitworks">
            <h3 className="num__tag">{number}</h3>
            <div className="howitworks__info">
                <h3 className="title">{title}</h3>
                <p className="howitworks__para">{text}</p>
            </div>
        </div>
    )
}

export default Howitworks