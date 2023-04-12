import styles from "./Loading.module.css"

const Loading = () => {

    return (
        <div className={styles.container_loading}>
            <div className={styles.lds_hourglass}></div>
        </div>
    )
}

export default Loading