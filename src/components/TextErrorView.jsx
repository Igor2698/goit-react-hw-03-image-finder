export default function TextErrorView({ message }) {
  return (
    <div role="alert">
      <p>{message}</p>
    </div>
  );
}
