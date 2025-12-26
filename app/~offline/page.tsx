export default function Offline() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>You are currently offline</h1>
      <p>Please check your internet connection and try again.</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
}
