export default function Home() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <h3>Please Wait...</h3>
        <div class="spinner-border " role="status">
          <span class="visually-hidden ">Loading...</span>
        </div>
      </div>
    </div>
  );
}
