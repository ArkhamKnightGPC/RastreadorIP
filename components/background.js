import Image from 'next/image'
import {bgWrap, bgText} from '../styles/Background.module.css' 

const Background = () => (
  <div>
    <div className={bgWrap}>
      <Image
        alt="Background"
        src="/pattern-bg.png"
        height={400}
        width={1500}
        quality={100}
      />
    </div>
  </div>
)

export default Background