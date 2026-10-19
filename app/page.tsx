import Image from 'next/image';
import Button from './components/Button';
import video from '../../public/hero-video.mp4';

const HomePage = () => {
  return (
    <div className="home-page">
      <Button text="Reserve Now" onClick={() => window.location.href = 'https://opentable.com'} />
      <video src={video} autoPlay loop muted className="hero-video" />
    </div>
  );
};

export default HomePage;