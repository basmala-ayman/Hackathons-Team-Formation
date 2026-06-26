import styles from "./states.module.css"
export function LoadingState({ message = "Loading", fullPage = false }) {
  return (
    <div className={`min-vh-100 d-flex flex-column justify-content-center align-items-center w-100 ${fullPage ? styles.fullPage : styles.wrapper}`}>
      <div className={styles.orbitWrapper}>
        <div className={styles.orbitRing2} />
        <div className={styles.orbitRing} />
        <div className={styles.orbitCore} />
      </div>
      <div className={styles.textWrapper}>
        <p className={`fs-3 fw-semibold ${styles.text}`}>{message}</p>
        <div className={styles.dots}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={styles.dot}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  message = "No data found",
}) {
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100"
      style={{ minHeight: "40vh" }}
    >
      <p className="fs-3 fw-semibold text-secondary">
        {message}
      </p>
    </div>
  );
}