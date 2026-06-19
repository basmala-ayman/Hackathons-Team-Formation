export function LoadingState({
  message = "Loading...",
}) {
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100"
      style={{ minHeight: "40vh" }}
    >
      <p
        className="fs-3 fw-semibold"
        style={{
          color: "var(--color-primary-dark)",
        }}
      >
        {message}
      </p>
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

