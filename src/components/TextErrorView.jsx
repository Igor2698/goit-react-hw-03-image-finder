export default function ImageErrorView({ message }) {
  return (
    <div role="alert">
      {/* <img src={errorImage} width="240" alt="sadcat" /> */}
      <p>{message}</p>
    </div>
  );
}
