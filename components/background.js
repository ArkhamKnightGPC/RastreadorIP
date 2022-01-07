import Image from 'next/image'
import {bgWrap, bgText} from '../styles/Background.module.css' 

const Background = () => (
  <div className={bgWrap}>
    <Image
      alt="Background"
      src="/pattern-bg.png"
      layout='fill'
      objectFit='cover'
      quality={100}
    />
  </div>
)

export default Background