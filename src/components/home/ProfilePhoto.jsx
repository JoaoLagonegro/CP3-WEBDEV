import foto160 from '../../assets/foto-160.webp';
import foto320 from '../../assets/foto-320.webp';
import styles from './ProfilePhoto.module.css';

export default function ProfilePhoto() {
  return (
    <img
      className={styles.photo}
      src={foto160}
      srcSet={`${foto160} 160w, ${foto320} 320w`}
      sizes="112px"
      width="112"
      height="112"
      alt="Foto de perfil do dono do portfólio"
      loading="lazy"
      decoding="async"
    />
  );
}
