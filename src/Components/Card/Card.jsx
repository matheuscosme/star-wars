import styles from "./Card.module.css"

function Card({name, img}) {
    
    const image = require(`../img/${img}`)

    return (
        <>
            <div>
                <div style={{ backgroundImage:`url(${image})`}} className={styles.image}></div>
                <div className={styles.text}> <p>{name}</p> </div>
            </div>
        </>
    )
}

export default Card