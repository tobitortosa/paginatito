import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div>
      <div className={s.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
