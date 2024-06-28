import './style.sass'
import logo from '../../assets/image.png'

export const Aside = () => {
  return (
    <ul className='aside'>
        <li><img src={logo}/></li>
        <li><button className='home-btn'></button></li>
        <li><button className='basket-btn'></button></li>
    </ul>
  )
}
