import styles from "./Card.module.css"

function Card({name, img}) {
    
    const image = require(`../img/${img}`)

    return (
        <>
            <div>
                <img className={styles.image} src={image} alt="" />
                <div className={styles.text}> <p>{name}</p> </div>
            </div>
        </>
    )
}

export default Card